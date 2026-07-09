// lib/videoSurahData.ts
import { getVersesForSurah, getTranslation, getSurahInfo } from './quranData';
import { getSurahNameTurkish } from './surahNames';

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

// ─── Generate VERSE_TEXTS from quranData ───────────────────────────────────
function generateVerseTexts(): Record<number, { text: string; translation: string }[]> {
  const record: Record<number, { text: string; translation: string }[]> = {};
  
  for (let surahNum = 1; surahNum <= 114; surahNum++) {
    const verses = getVersesForSurah(surahNum);
    record[surahNum] = verses.map(verse => ({
      text: verse.arabic,
      translation: getTranslation(surahNum, verse.verse_number, 'diyanet') || ''
    }));
  }
  
  return record;
}

// ─── Generate SURAH_META from surahNames ───────────────────────────────────
function generateSurahMeta(): Record<number, { name: string; nameArabic: string }> {
  const record: Record<number, { name: string; nameArabic: string }> = {};
  
  for (let i = 1; i <= 114; i++) {
    const info = getSurahInfo(i);
    record[i] = {
      name: getSurahNameTurkish(i),
      nameArabic: info?.name_arabic || ''
    };
  }
  
  return record;
}

// ─── Local asset'ler - Statik olarak tanımlanmalı ─────────────────────────
const AUDIO: Record<number, any> = {
  1: require('../scripts/assets/audio/001.mp3'),
  2: require('../scripts/assets/audio/002.mp3'),
  3: require('../scripts/assets/audio/003.mp3'),
  4: require('../scripts/assets/audio/004.mp3'),
  5: require('../scripts/assets/audio/005.mp3'),
  6: require('../scripts/assets/audio/006.mp3'),
  7: require('../scripts/assets/audio/007.mp3'),
  8: require('../scripts/assets/audio/008.mp3'),
  9: require('../scripts/assets/audio/009.mp3'),
  10: require('../scripts/assets/audio/010.mp3'),
  11: require('../scripts/assets/audio/011.mp3'),
  12: require('../scripts/assets/audio/012.mp3'),
  13: require('../scripts/assets/audio/013.mp3'),
  14: require('../scripts/assets/audio/014.mp3'),
  15: require('../scripts/assets/audio/015.mp3'),
  16: require('../scripts/assets/audio/016.mp3'),
  17: require('../scripts/assets/audio/017.mp3'),
  18: require('../scripts/assets/audio/018.mp3'),
  19: require('../scripts/assets/audio/019.mp3'),
  20: require('../scripts/assets/audio/020.mp3'),
  21: require('../scripts/assets/audio/021.mp3'),
  22: require('../scripts/assets/audio/022.mp3'),
  23: require('../scripts/assets/audio/023.mp3'),
  24: require('../scripts/assets/audio/024.mp3'),
  25: require('../scripts/assets/audio/025.mp3'),
  26: require('../scripts/assets/audio/026.mp3'),
  27: require('../scripts/assets/audio/027.mp3'),
  28: require('../scripts/assets/audio/028.mp3'),
  29: require('../scripts/assets/audio/029.mp3'),
  30: require('../scripts/assets/audio/030.mp3'),
  31: require('../scripts/assets/audio/031.mp3'),
  32: require('../scripts/assets/audio/032.mp3'),
  33: require('../scripts/assets/audio/033.mp3'),
  34: require('../scripts/assets/audio/034.mp3'),
  35: require('../scripts/assets/audio/035.mp3'),
  36: require('../scripts/assets/audio/036.mp3'),
  37: require('../scripts/assets/audio/037.mp3'),
  38: require('../scripts/assets/audio/038.mp3'),
  39: require('../scripts/assets/audio/039.mp3'),
  40: require('../scripts/assets/audio/040.mp3'),
  41: require('../scripts/assets/audio/041.mp3'),
  42: require('../scripts/assets/audio/042.mp3'),
  43: require('../scripts/assets/audio/043.mp3'),
  44: require('../scripts/assets/audio/044.mp3'),
  45: require('../scripts/assets/audio/045.mp3'),
  46: require('../scripts/assets/audio/046.mp3'),
  47: require('../scripts/assets/audio/047.mp3'),
  48: require('../scripts/assets/audio/048.mp3'),
  49: require('../scripts/assets/audio/049.mp3'),
  50: require('../scripts/assets/audio/050.mp3'),
  51: require('../scripts/assets/audio/051.mp3'),
  52: require('../scripts/assets/audio/052.mp3'),
  53: require('../scripts/assets/audio/053.mp3'),
  54: require('../scripts/assets/audio/054.mp3'),
  55: require('../scripts/assets/audio/055.mp3'),
  56: require('../scripts/assets/audio/056.mp3'),
  57: require('../scripts/assets/audio/057.mp3'),
  58: require('../scripts/assets/audio/058.mp3'),
  59: require('../scripts/assets/audio/059.mp3'),
  60: require('../scripts/assets/audio/060.mp3'),
  61: require('../scripts/assets/audio/061.mp3'),
  62: require('../scripts/assets/audio/062.mp3'),
  63: require('../scripts/assets/audio/063.mp3'),
  64: require('../scripts/assets/audio/064.mp3'),
  65: require('../scripts/assets/audio/065.mp3'),
  66: require('../scripts/assets/audio/066.mp3'),
  67: require('../scripts/assets/audio/067.mp3'),
  68: require('../scripts/assets/audio/068.mp3'),
  69: require('../scripts/assets/audio/069.mp3'),
  70: require('../scripts/assets/audio/070.mp3'),
  71: require('../scripts/assets/audio/071.mp3'),
  72: require('../scripts/assets/audio/072.mp3'),
  73: require('../scripts/assets/audio/073.mp3'),
  74: require('../scripts/assets/audio/074.mp3'),
  75: require('../scripts/assets/audio/075.mp3'),
  76: require('../scripts/assets/audio/076.mp3'),
  77: require('../scripts/assets/audio/077.mp3'),
  78: require('../scripts/assets/audio/078.mp3'),
  79: require('../scripts/assets/audio/079.mp3'),
  80: require('../scripts/assets/audio/080.mp3'),
  81: require('../scripts/assets/audio/081.mp3'),
  82: require('../scripts/assets/audio/082.mp3'),
  83: require('../scripts/assets/audio/083.mp3'),
  84: require('../scripts/assets/audio/084.mp3'),
  85: require('../scripts/assets/audio/085.mp3'),
  86: require('../scripts/assets/audio/086.mp3'),
  87: require('../scripts/assets/audio/087.mp3'),
  88: require('../scripts/assets/audio/088.mp3'),
  89: require('../scripts/assets/audio/089.mp3'),
  90: require('../scripts/assets/audio/090.mp3'),
  91: require('../scripts/assets/audio/091.mp3'),
  92: require('../scripts/assets/audio/092.mp3'),
  93: require('../scripts/assets/audio/093.mp3'),
  94: require('../scripts/assets/audio/094.mp3'),
  95: require('../scripts/assets/audio/095.mp3'),
  96: require('../scripts/assets/audio/096.mp3'),
  97: require('../scripts/assets/audio/097.mp3'),
  98: require('../scripts/assets/audio/098.mp3'),
  99: require('../scripts/assets/audio/099.mp3'),
  100: require('../scripts/assets/audio/100.mp3'),
  101: require('../scripts/assets/audio/101.mp3'),
  102: require('../scripts/assets/audio/102.mp3'),
  103: require('../scripts/assets/audio/103.mp3'),
  104: require('../scripts/assets/audio/104.mp3'),
  105: require('../scripts/assets/audio/105.mp3'),
  106: require('../scripts/assets/audio/106.mp3'),
  107: require('../scripts/assets/audio/107.mp3'),
  108: require('../scripts/assets/audio/108.mp3'),
  109: require('../scripts/assets/audio/109.mp3'),
  110: require('../scripts/assets/audio/110.mp3'),
  111: require('../scripts/assets/audio/111.mp3'),
  112: require('../scripts/assets/audio/112.mp3'),
  113: require('../scripts/assets/audio/113.mp3'),
  114: require('../scripts/assets/audio/114.mp3'),
};

const TIMINGS: Record<number, any> = {
  1: require('../scripts/assets/timings/001.json'),
  2: require('../scripts/assets/timings/002.json'),
  3: require('../scripts/assets/timings/003.json'),
  4: require('../scripts/assets/timings/004.json'),
  5: require('../scripts/assets/timings/005.json'),
  6: require('../scripts/assets/timings/006.json'),
  7: require('../scripts/assets/timings/007.json'),
  8: require('../scripts/assets/timings/008.json'),
  9: require('../scripts/assets/timings/009.json'),
  10: require('../scripts/assets/timings/010.json'),
  11: require('../scripts/assets/timings/011.json'),
  12: require('../scripts/assets/timings/012.json'),
  13: require('../scripts/assets/timings/013.json'),
  14: require('../scripts/assets/timings/014.json'),
  15: require('../scripts/assets/timings/015.json'),
  16: require('../scripts/assets/timings/016.json'),
  17: require('../scripts/assets/timings/017.json'),
  18: require('../scripts/assets/timings/018.json'),
  19: require('../scripts/assets/timings/019.json'),
  20: require('../scripts/assets/timings/020.json'),
  21: require('../scripts/assets/timings/021.json'),
  22: require('../scripts/assets/timings/022.json'),
  23: require('../scripts/assets/timings/023.json'),
  24: require('../scripts/assets/timings/024.json'),
  25: require('../scripts/assets/timings/025.json'),
  26: require('../scripts/assets/timings/026.json'),
  27: require('../scripts/assets/timings/027.json'),
  28: require('../scripts/assets/timings/028.json'),
  29: require('../scripts/assets/timings/029.json'),
  30: require('../scripts/assets/timings/030.json'),
  31: require('../scripts/assets/timings/031.json'),
  32: require('../scripts/assets/timings/032.json'),
  33: require('../scripts/assets/timings/033.json'),
  34: require('../scripts/assets/timings/034.json'),
  35: require('../scripts/assets/timings/035.json'),
  36: require('../scripts/assets/timings/036.json'),
  37: require('../scripts/assets/timings/037.json'),
  38: require('../scripts/assets/timings/038.json'),
  39: require('../scripts/assets/timings/039.json'),
  40: require('../scripts/assets/timings/040.json'),
  41: require('../scripts/assets/timings/041.json'),
  42: require('../scripts/assets/timings/042.json'),
  43: require('../scripts/assets/timings/043.json'),
  44: require('../scripts/assets/timings/044.json'),
  45: require('../scripts/assets/timings/045.json'),
  46: require('../scripts/assets/timings/046.json'),
  47: require('../scripts/assets/timings/047.json'),
  48: require('../scripts/assets/timings/048.json'),
  49: require('../scripts/assets/timings/049.json'),
  50: require('../scripts/assets/timings/050.json'),
  51: require('../scripts/assets/timings/051.json'),
  52: require('../scripts/assets/timings/052.json'),
  53: require('../scripts/assets/timings/053.json'),
  54: require('../scripts/assets/timings/054.json'),
  55: require('../scripts/assets/timings/055.json'),
  56: require('../scripts/assets/timings/056.json'),
  57: require('../scripts/assets/timings/057.json'),
  58: require('../scripts/assets/timings/058.json'),
  59: require('../scripts/assets/timings/059.json'),
  60: require('../scripts/assets/timings/060.json'),
  61: require('../scripts/assets/timings/061.json'),
  62: require('../scripts/assets/timings/062.json'),
  63: require('../scripts/assets/timings/063.json'),
  64: require('../scripts/assets/timings/064.json'),
  65: require('../scripts/assets/timings/065.json'),
  66: require('../scripts/assets/timings/066.json'),
  67: require('../scripts/assets/timings/067.json'),
  68: require('../scripts/assets/timings/068.json'),
  69: require('../scripts/assets/timings/069.json'),
  70: require('../scripts/assets/timings/070.json'),
  71: require('../scripts/assets/timings/071.json'),
  72: require('../scripts/assets/timings/072.json'),
  73: require('../scripts/assets/timings/073.json'),
  74: require('../scripts/assets/timings/074.json'),
  75: require('../scripts/assets/timings/075.json'),
  76: require('../scripts/assets/timings/076.json'),
  77: require('../scripts/assets/timings/077.json'),
  78: require('../scripts/assets/timings/078.json'),
  79: require('../scripts/assets/timings/079.json'),
  80: require('../scripts/assets/timings/080.json'),
  81: require('../scripts/assets/timings/081.json'),
  82: require('../scripts/assets/timings/082.json'),
  83: require('../scripts/assets/timings/083.json'),
  84: require('../scripts/assets/timings/084.json'),
  85: require('../scripts/assets/timings/085.json'),
  86: require('../scripts/assets/timings/086.json'),
  87: require('../scripts/assets/timings/087.json'),
  88: require('../scripts/assets/timings/088.json'),
  89: require('../scripts/assets/timings/089.json'),
  90: require('../scripts/assets/timings/090.json'),
  91: require('../scripts/assets/timings/091.json'),
  92: require('../scripts/assets/timings/092.json'),
  93: require('../scripts/assets/timings/093.json'),
  94: require('../scripts/assets/timings/094.json'),
  95: require('../scripts/assets/timings/095.json'),
  96: require('../scripts/assets/timings/096.json'),
  97: require('../scripts/assets/timings/097.json'),
  98: require('../scripts/assets/timings/098.json'),
  99: require('../scripts/assets/timings/099.json'),
  100: require('../scripts/assets/timings/100.json'),
  101: require('../scripts/assets/timings/101.json'),
  102: require('../scripts/assets/timings/102.json'),
  103: require('../scripts/assets/timings/103.json'),
  104: require('../scripts/assets/timings/104.json'),
  105: require('../scripts/assets/timings/105.json'),
  106: require('../scripts/assets/timings/106.json'),
  107: require('../scripts/assets/timings/107.json'),
  108: require('../scripts/assets/timings/108.json'),
  109: require('../scripts/assets/timings/109.json'),
  110: require('../scripts/assets/timings/110.json'),
  111: require('../scripts/assets/timings/111.json'),
  112: require('../scripts/assets/timings/112.json'),
  113: require('../scripts/assets/timings/113.json'),
  114: require('../scripts/assets/timings/114.json'),
};

const VERSE_TEXTS = generateVerseTexts();
const SURAH_META = generateSurahMeta();

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
  // Validate surah number
  const validNumber = Math.max(1, Math.min(Math.floor(surahNumber), 114));
  
  // Get all data
  const audio = AUDIO[validNumber];
  const timing = TIMINGS[validNumber];
  const texts = VERSE_TEXTS[validNumber];
  const meta = SURAH_META[validNumber];

  const verses: VerseWithTiming[] = timing.timings.map((t: any, index: number) => ({
    verseNumber: t.verseNumber,
    start: t.start,
    text: texts[index]?.text || '',
    translation: texts[index]?.translation || '',
  }));

  return {
    surahNumber: validNumber,
    surahName: meta.name,
    surahNameArabic: meta.nameArabic,
    totalDuration: timing.totalDuration,
    verses: verses.slice(0, texts.length), // Limit to actual verse count
  };
}

// Eski testSurahData — artık JSON'dan geliyor
export const testSurahData: SurahVideoData = getSurahData(1);