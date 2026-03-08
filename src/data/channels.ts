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
    url: "https://aps31.playlist.live-video.net/v1/playlist/CpYFncks2V8akiYjDG9W7G_vK1hWMRPuigTmRZZlqqu8L5NhDIjkthJt_AKl_WvrsTBoU0AZ0DgO_hY1tIRLM10fs9SH_NBZZmZPruFP-xUd-qRPynqr3zDBzoPa2x5CQgWQ8jekXY8kNq_i0ZDczbEup9noaDLHgxeBViwrsLs-sG_1Tng7qRMCPiTZI1x2nLgNhGGYk3jUie4VQqDIDKMWRX_ERgbIVqgdrYYqSSygMGxvYVCZ42AGJEOWw0RXZGs3r90kO8uT6P0bfoL1iSiM6rOGAEGhTHpbxUpcOho3Z5uvRUaGSjrbg793_SUCWhEPI2Y20xGcKwogMfh3DV-oLW1Cq2JriLebn5Xqy-xKW8WSuoP-rC2PP9BFZ19NZWtzIXUPEcLBkNtcwIMbh-i-nu_xkvji9awUbxLCqlAdLFy1Vihu8CkfJfdLfZvIEQeOlwcYLARmbHTQ9u8igSVMk49F514pNXpp0YB7AwEqlSpfgsuGg2HU1I9AsLN2MNtjVZiYIZ8ZHcH01_i7wyNIitXid2QLVQh8cbWMES6y8Gf6-CPhXwtgZP5ONVWkYzx8cXIHxZQHYGzlvcKjrDT0CJ76mz-sAugc8o-cDYh-nGx1fF1pkYACFCpS7Zo7Fc_iMsIY9HNhi3rycs96twYRViwBBSBil9GDzFXX_UZx2vQjy4NxOYuLoAcPCYZrDeyP9gjk2cXGp6rF2bkBRL1NQ1XHfnG-uPJWF9lEhT1wzMY_f7gIpr5H1B5fMEL-lcK9o8HL3Ud18mhe0JNGWTKbONtkFi3q7o5qHHmh9zfA9AoCb5kPmHG3pAnq5-bGd5Xwpth5x9wTPCKg9QfP76LXNArIRORV0eMkA4Pp8M7jwUgwHQlgjpkaDBZcY3Urfa9vpQKFWSABKgl1cy13ZXN0LTIwzA4.m3u8",
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
    url: "https://grand-s-main.faggotsports.tv/out/v2/3a5b67d896f26d4ed700b86c64053eb7/index.m3u8",
    category: "Sports",
    logo: "⭐",
    description: "India's No.1 Sports Channel – Live Action 24/7",
    isLive: true,
    viewers: 62300,
    sport: "Multi-Sport",
  },
];

export default channels;
