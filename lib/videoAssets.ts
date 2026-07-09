// lib/videoAssets.ts
// CDN'den videolar yükleniyor (Cloudflare R2)

const CDN_BASE_URL = 'https://pub-d349e03f186e4a2fbcc17b4c14519503.r2.dev/videos/videos';

export const VIDEO_ASSETS = {
  kabe: { uri: `${CDN_BASE_URL}/kabe_c.mp4` },
  medine: { uri: `${CDN_BASE_URL}/medine_c.mp4` },
  doga: { uri: `${CDN_BASE_URL}/doga_c.mp4` },
  deniz: { uri: `${CDN_BASE_URL}/deniz_c.mp4` },
  gece: { uri: `${CDN_BASE_URL}/gece_c.mp4` },
} as const;

// Yerel videolar için yedek (development)
// export const VIDEO_ASSETS = {
//   kabe: require('../assets/videos/kabe_c.mp4'),
//   medine: require('../assets/videos/medine_c.mp4'),
//   doga: require('../assets/videos/doga_c.mp4'),
//   deniz: require('../assets/videos/deniz_c.mp4'),
//   gece: require('../assets/videos/gece_c.mp4'),
// } as const;

export type VideoKey = keyof typeof VIDEO_ASSETS;

export function getVideosForSurah(surahNumber: number): VideoKey[] {
  return ['kabe', 'medine', 'doga', 'deniz', 'gece'];
}
