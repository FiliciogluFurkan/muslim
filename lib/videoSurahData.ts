// lib/videoSurahData.ts

export interface VerseWithTiming {
  text: string;
  translation: string;
  start: number;
  verseNumber: number;
}

export interface SurahVideoData {
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  totalDuration: number;
  verses: VerseWithTiming[];
}

// ─── Local asset'ler ───────────────────────────────────────────────────────
const AUDIO: Record<number, any> = {
  1: require('../scripts/assets/audio/001.mp3'),
};

const TIMINGS: Record<number, any> = {
  1: require('../scripts/assets/timings/001.json'),
};

const VERSE_TEXTS: Record<number, { text: string; translation: string }[]> = {
  1: [
    { text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',     translation: "Rahman ve Rahim olan Allah'ın adıyla" },
    { text: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ',         translation: "Hamd, âlemlerin Rabbi Allah'a mahsustur" },
    { text: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',                       translation: "O, Rahman ve Rahim'dir" },
    { text: 'مَٰلِكِ يَوْمِ ٱلدِّينِ',                       translation: 'Din gününün sahibidir' },
    { text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',     translation: 'Yalnız sana ibadet eder, yalnız senden yardım dileriz' },
    { text: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',           translation: 'Bizi doğru yola ilet' },
    { text: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
                                                               translation: 'Kendilerine nimet verdiklerinin yoluna; gazaba uğrayanların ve sapkınların yoluna değil' },
  ],
};

const SURAH_META: Record<number, { name: string; nameArabic: string }> = {
  1: { name: 'Fatiha', nameArabic: 'الفاتحة' },
};

// ─── Audio source — VideoPlayerScreen'de useAudioPlayer'a geç ─────────────
export function getAudioSource(surahNumber: number): any {
  return AUDIO[surahNumber];
}

// Eski getAudioUrl — artık local'e yönlendiriyor
export function getAudioUrl(surahNumber: number): any {
  return AUDIO[surahNumber];
}

// ─── JSON'dan okuyarak SurahVideoData üret ────────────────────────────────
export function getSurahData(surahNumber: number): SurahVideoData {
  const timing = TIMINGS[surahNumber];
  const texts  = VERSE_TEXTS[surahNumber];
  const meta   = SURAH_META[surahNumber];

  const verses: VerseWithTiming[] = timing.timings.map((t: any) => ({
    verseNumber: t.verseNumber,
    start:       t.start,
    text:        texts[t.verseNumber - 1].text,
    translation: texts[t.verseNumber - 1].translation,
  }));

  return {
    surahNumber,
    surahName:       meta.name,
    surahNameArabic: meta.nameArabic,
    totalDuration:   timing.totalDuration,
    verses,
  };
}

// Eski testSurahData — artık JSON'dan geliyor
export const testSurahData: SurahVideoData = getSurahData(1);