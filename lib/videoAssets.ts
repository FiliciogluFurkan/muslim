// lib/videoAssets.ts
// Yerel videolar: assets/videos/ (gitignore'da — Pexels/Pixabay'dan indirip ekleyin)
// Geliştirme için uzak örnek videolar kullanılır; yerel dosyalar varsa require'a geçin.

const REMOTE_VIDEOS = {
  kabe: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  medine: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  doga: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  deniz: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  gece: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
} as const;

// Yerel videoları kullanmak için aşağıdaki bloğu açıp REMOTE_VIDEOS yerine bunu export edin:
// export const VIDEO_ASSETS = {
//   kabe:   require('../assets/videos/kabe_c.mp4'),
//   medine: require('../assets/videos/medine_c.mp4'),
//   doga:   require('../assets/videos/doga_c.mp4'),
//   deniz:  require('../assets/videos/deniz_c.mp4'),
//   gece:   require('../assets/videos/gece_c.mp4'),
// } as const;

export const VIDEO_ASSETS = REMOTE_VIDEOS;

export type VideoKey = keyof typeof VIDEO_ASSETS;

export function getVideosForSurah(surahNumber: number): VideoKey[] {
  return ['kabe', 'medine', 'doga', 'deniz', 'gece'];
}
