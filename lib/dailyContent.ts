import quranData from '../assets/data/quran_full.json';
import hadithsData from '../assets/data/hadiths.json';

type QuranVerse = {
  surah_number: number;
  verse_number: number;
  arabic: string;
  page_number: number;
  juz_number: number;
};

export type HadithRecord = {
  text_turkish: string;
  source: string;
  narrator?: string;
};

const verses = quranData as QuranVerse[];
const hadiths = hadithsData as HadithRecord[];

/** Tarihi YYYYMMDD sayısına çevirir (yerel takvim). */
export function dateToSeed(d: Date): number {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return y * 10000 + m * 100 + day;
}

function modIndex(seed: number, length: number): number {
  if (length <= 0) return 0;
  return Math.abs(seed) % length;
}

export function getVerseIndexForSeed(seed: number): number {
  return modIndex(seed, verses.length);
}

export function getHadithIndexForSeed(seed: number): number {
  return modIndex(seed, hadiths.length);
}

export type DailyContent = {
  dateSeed: number;
  verse: QuranVerse & { turkish?: string };
  hadith: HadithRecord;
};

export function getDailyContentForDate(d: Date): DailyContent {
  const dateSeed = dateToSeed(d);
  const vi = getVerseIndexForSeed(dateSeed);
  const hi = getHadithIndexForSeed(dateSeed);
  return {
    dateSeed,
    verse: verses[vi],
    hadith: hadiths[hi],
  };
}

export function getDailyContentToday(): DailyContent {
  return getDailyContentForDate(new Date());
}
