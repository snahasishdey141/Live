import { Play, Users, Signal } from "lucide-react";
import type { Channel } from "../data/channels";

interface ChannelCardProps {
  channel: Channel;
  onClick: (channel: Channel) => void;
}

function formatViewers(num: number): string {
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export default function ChannelCard({ channel, onClick }: ChannelCardProps) {
  return (
    <button
      onClick={() => onClick(channel)}
      className="group relative bg-gray-900/60 border border-gray-800/60 rounded-2xl overflow-hidden hover:border-red-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1 text-left w-full cursor-pointer"
    >
      {/* Thumbnail area */}
      <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(239,68,68,0.3),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(249,115,22,0.2),transparent_60%)]" />
        </div>

        {/* Big emoji logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl">
            {channel.logo}
          </span>
        </div>

        {/* Live badge */}
        {channel.isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-red-600 rounded-md shadow-lg shadow-red-600/30">
            <Signal className="w-3 h-3 text-white animate-pulse" />
            <span className="text-[11px] font-bold text-white tracking-wide uppercase">
              Live
            </span>
          </div>
        )}

        {/* Viewers */}
        {channel.viewers && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
            <Users className="w-3 h-3 text-gray-300" />
            <span className="text-[11px] font-medium text-gray-300">
              {formatViewers(channel.viewers)}
            </span>
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl shadow-red-600/40">
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </div>
        </div>

        {/* Sport tag */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-[11px] font-medium text-gray-300 border border-white/10">
            {channel.sport}
          </span>
        </div>
      </div>

      {/* Info area */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-sm truncate group-hover:text-red-400 transition-colors">
              {channel.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
              {channel.description}
            </p>
          </div>
          <span
            className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${
              channel.isLive ? "bg-green-400 shadow-sm shadow-green-400/50" : "bg-gray-600"
            }`}
          />
        </div>

        {/* Category */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">
            {channel.category}
          </span>
          <span className="text-[11px] text-gray-600 group-hover:text-red-400/60 transition-colors font-medium">
            Watch Now →
          </span>
        </div>
      </div>
    </button>
  );
}
