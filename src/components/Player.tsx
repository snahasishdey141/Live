import { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import {
  ArrowLeft,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Signal,
  Users,
  AlertCircle,
  Server,
} from "lucide-react";
import type { Channel } from "../data/channels";

interface PlayerProps {
  channel: Channel;
  onBack: () => void;
}

export default function Player({ channel, onBack }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeServer, setActiveServer] = useState(0);
  const controlsTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const hlsRef = useRef<Hls | null>(null);

  const currentUrl = channel.servers[activeServer]?.url ?? "";

  const loadStream = useCallback(
    (url: string) => {
      const video = videoRef.current;
      if (!video) return;

      setLoading(true);
      setError(null);

      // Destroy previous HLS instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setLoading(false);
          video.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            setError("Stream unavailable. Try another server.");
            setLoading(false);
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.addEventListener(
          "loadedmetadata",
          () => {
            setLoading(false);
            video.play().catch(() => {});
          },
          { once: true }
        );
      } else {
        setError("Your browser doesn't support HLS streaming.");
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadStream(currentUrl);
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentUrl, loadStream]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const switchServer = (index: number) => {
    if (index === activeServer) return;
    setActiveServer(index);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top bar */}
      <div className="bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back to Channels</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Server Selector Buttons */}
        {channel.servers.length > 1 && (
          <div className="mb-4 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-gray-400">
              <Server className="w-4 h-4" />
              <span className="text-sm font-medium">Select Server:</span>
            </div>
            <div className="flex gap-2">
              {channel.servers.map((server, index) => (
                <button
                  key={index}
                  onClick={() => switchServer(index)}
                  className={`
                    relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer
                    ${
                      activeServer === index
                        ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-500/25 scale-105"
                        : "bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700/50 hover:border-gray-600"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {activeServer === index && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                    {server.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Video Player */}
        <div
          ref={containerRef}
          className="relative bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/50 aspect-video group"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            playsInline
          />

          {/* Loading spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-3 border-gray-700 border-t-red-500 rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading stream...</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <AlertCircle className="w-12 h-12 text-red-400" />
                <p className="text-sm text-gray-300">{error}</p>
                {channel.servers.length > 1 && (
                  <p className="text-xs text-gray-500">
                    Try switching to a different server above
                  </p>
                )}
                <button
                  onClick={onBack}
                  className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg transition-colors cursor-pointer"
                >
                  Go Back
                </button>
              </div>
            </div>
          )}

          {/* Controls overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Top info */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{channel.logo}</span>
                <div>
                  <h2 className="text-white font-semibold text-sm">
                    {channel.name}
                  </h2>
                  <p className="text-gray-400 text-xs">{channel.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {channel.servers.length > 1 && (
                  <div className="px-2.5 py-1 bg-gray-800/80 rounded-md">
                    <span className="text-[11px] font-medium text-gray-300">
                      {channel.servers[activeServer].name}
                    </span>
                  </div>
                )}
                {channel.isLive && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 rounded-md">
                    <Signal className="w-3 h-3 text-white animate-pulse" />
                    <span className="text-[11px] font-bold text-white uppercase">
                      Live
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Center play button */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-red-600/80 hover:bg-red-600 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-2xl">
                {isPlaying ? (
                  <Pause className="w-7 h-7 text-white" fill="white" />
                ) : (
                  <Play className="w-7 h-7 text-white ml-1" fill="white" />
                )}
              </div>
            </button>

            {/* Bottom controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-red-400 transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-red-400 transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                {channel.viewers && (
                  <div className="flex items-center gap-1.5 ml-2">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {channel.viewers.toLocaleString()} watching
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-red-400 transition-colors cursor-pointer"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Channel info below player */}
        <div className="mt-6 bg-gray-900/60 border border-gray-800/60 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-red-500/10">
              <span className="text-3xl">{channel.logo}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-white">{channel.name}</h2>
                {channel.isLive && (
                  <span className="px-2 py-0.5 bg-red-500/15 text-red-400 text-xs font-semibold rounded-full border border-red-500/20">
                    ● LIVE
                  </span>
                )}
                <span className="px-2.5 py-0.5 bg-gray-800 text-gray-400 text-xs font-medium rounded-full">
                  {channel.sport}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1.5">
                {channel.description}
              </p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="text-xs text-gray-500">
                  Category: {channel.category}
                </span>
                {channel.viewers && (
                  <span className="text-xs text-gray-500">
                    {channel.viewers.toLocaleString()} viewers
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  Servers available: {channel.servers.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
