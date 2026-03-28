// lib/videoAssets.ts
// Pexels/Pixabay'dan indirdiğin videolar buraya gelecek
// Önerilen içerikler: Kabe, Mekke, çöl, su, yeşil doğa, gece gökyüzü

export const VIDEO_ASSETS = {
  kabe:   require('../assets/videos/kabe_c.mp4'),
  medine: require('../assets/videos/medine_c.mp4'),
  doga:   require('../assets/videos/doga_c.mp4'),
  deniz:  require('../assets/videos/deniz_c.mp4'),
  gece:   require('../assets/videos/gece_c.mp4'),
} as const;
export type VideoKey = keyof typeof VIDEO_ASSETS;

// Sure numarasına göre video listesi döner
// İleride her sure için özel tema atayabilirsin
export function getVideosForSurah(surahNumber: number): VideoKey[] {
  // Şimdilik tüm sureler için aynı set
  // TODO: Her sure için özel tema (cennet/cehennem/doğa vb.)
  return ['kabe', 'medine', 'doga', 'deniz', 'gece'];
}