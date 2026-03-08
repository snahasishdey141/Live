import { useState } from "react";
import Navbar from "./components/Navbar";
import ChannelCard from "./components/ChannelCard";
import Player from "./components/Player";
import channels from "./data/channels";
import type { Channel } from "./data/channels";

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  const liveCount = channels.filter((ch) => ch.isLive).length;

  if (selectedChannel) {
    return (
      <Player
        channel={selectedChannel}
        onBack={() => setSelectedChannel(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar onLogoClick={() => {}} />

      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/8 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-red-400 uppercase tracking-wide">
                {liveCount} Channels Live Now
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Watch{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                Live Sports
              </span>{" "}
              Streaming
            </h1>
            <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
              Your one-stop destination for live sports coverage. Pick a channel and enjoy!
            </p>
          </div>
        </div>
      </div>

      {/* Channel cards */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              onClick={setSelectedChannel}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-xs text-gray-600">
            © 2024 StreamZone. All rights reserved. For entertainment purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
