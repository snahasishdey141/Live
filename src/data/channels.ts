// ============================================================
// 🔧 UPDATE YOUR M3U8 LINKS HERE
// Simply change the 'url' field for each channel
// ============================================================

export interface Channel {
  id: string;
  name: string;
  url: string;
  category: string;
  logo: string;
  description: string;
  isLive: boolean;
  viewers?: number;
  sport: string;
}

const channels: Channel[] = [
  {
    id: "1",
    name: "JioStar Hotstar",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    category: "Sports",
    logo: "🔥",
    description: "Live Cricket, Football & More – Premium Sports",
    isLive: true,
    viewers: 85400,
    sport: "Multi-Sport",
  },
  {
    id: "2",
    name: "Star Sports",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    category: "Sports",
    logo: "⭐",
    description: "India's No.1 Sports Channel – Live Action 24/7",
    isLive: true,
    viewers: 62300,
    sport: "Multi-Sport",
  },
];

export default channels;
