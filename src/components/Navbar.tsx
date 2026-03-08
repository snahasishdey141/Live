import { Tv, Radio } from "lucide-react";

interface NavbarProps {
  onLogoClick: () => void;
}

export default function Navbar({ onLogoClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-shadow">
                <Tv className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-gray-950 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-none">
                Stream<span className="text-red-500">Zone</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase leading-none mt-0.5">
                Live Sports
              </p>
            </div>
          </button>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">
              Live Now
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
