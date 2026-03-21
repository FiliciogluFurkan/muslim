import quranData from '../assets/data/quran_full.json';
import surahsData from '../assets/data/surahs.json';
import juzData from '../assets/data/juzs.json';
import diyanetData from '../assets/data/translations/diyanet.json';
import elmaliData from '../assets/data/translations/elmali.json';
import type { TranslationId } from './store';

/* ─── Types ───────────────────────────────────────────── */

export type QuranVerse = {
  surah_number: number;
  verse_number: number;
  arabic: string;
  page_number: number;
  juz_number: number;
};

export type SurahInfo = {
  number: number;
  name_arabic: string;
  name_english: string;
  verse_count: number;
  revelation_type: string;
};

export type JuzInfo = {
  juz_number: number;
  start_surah: number;
  start_verse: number;
  end_surah: number;
  end_verse: number;
  verse_count: number;
};

type TranslationEntry = {
  surah_number: number;
  verse_number: number;
  text: string;
};

/* ─── Data ────────────────────────────────────────────── */

const allVerses = quranData as QuranVerse[];
const surahs = surahsData as SurahInfo[];
const juzs = juzData as JuzInfo[];

const translationMap: Record<TranslationId, TranslationEntry[]> = {
  diyanet: diyanetData as TranslationEntry[],
  elmali: elmaliData as TranslationEntry[],
};

/* keyed lookup: `${surah}_${verse}` → index in translation array */
function buildIndex(entries: TranslationEntry[]): Map<string, string> {
  const m = new Map<string, string>();
  for (const e of entries) {
    m.set(`${e.surah_number}_${e.verse_number}`, e.text);
  }
  return m;
}

const translationIndices: Record<TranslationId, Map<string, string>> = {
  diyanet: buildIndex(translationMap.diyanet),
  elmali: buildIndex(translationMap.elmali),
};

/* ─── Surah ───────────────────────────────────────────── */

export function getAllSurahs(): SurahInfo[] {
  return surahs;
}

export function getSurahInfo(surahNum: number): SurahInfo | undefined {
  return surahs.find((s) => s.number === surahNum);
}

export function getVersesForSurah(surahNum: number): QuranVerse[] {
  return allVerses.filter((v) => v.surah_number === surahNum);
}

/* ─── Juz ─────────────────────────────────────────────── */

export function getAllJuzs(): JuzInfo[] {
  return juzs;
}

export function getVersesForJuz(juzNum: number): QuranVerse[] {
  return allVerses.filter((v) => v.juz_number === juzNum);
}

/* ─── Page ────────────────────────────────────────────── */

export function getVersesForPage(pageNum: number): QuranVerse[] {
  return allVerses.filter((v) => v.page_number === pageNum);
}

export function getTotalPages(): number {
  if (allVerses.length === 0) return 0;
  return allVerses[allVerses.length - 1].page_number;
}

/* ─── Translation ─────────────────────────────────────── */

export function getTranslation(
  surahNum: number,
  verseNum: number,
  translationId: TranslationId,
): string {
  const idx = translationIndices[translationId];
  return idx?.get(`${surahNum}_${verseNum}`) ?? '';
}

export function getAvailableTranslations(): { id: TranslationId; name: string }[] {
  return [
    { id: 'diyanet', name: 'Diyanet İşleri' },
    { id: 'elmali', name: 'Elmalılı Hamdi Yazır' },
  ];
}

/* ─── Full Quran ──────────────────────────────────────── */

export function getAllVerses(): QuranVerse[] {
  return allVerses;
}

export function getTotalVerses(): number {
  return allVerses.length;
}
