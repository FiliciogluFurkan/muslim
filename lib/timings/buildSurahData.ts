// lib/timings/buildSurahData.ts
// Bu fonksiyon runtime'da çağrılır — uygulama başlarken veya sure açılırken

import { parseEveryayahTimings } from './parser';
import { fetchSurahTexts } from './quranData';
import type { SurahVideoData, VerseWithTiming } from '../videoSurahData';

// Everyayah'tan timing dosyasını çek
async function fetchTimingFile(surahNumber: number): Promise<string> {
  const padded = String(surahNumber).padStart(3, '0');
  // Everyayah tek tek sure dosyaları da sunuyor
  const url = `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/${padded}001.mp3`;
  // NOT: timing için ayrı endpoint — txt dosyası ZIP içinde
  // Alternatif: kendi backend'inden sun
  // Şimdilik quran-timing open source repo'sunu kullan:
  const timingUrl = `https://raw.githubusercontent.com/islamic-network/cdn/master/info/meta/ayah-timings/yasser-ad-dussary/${padded}.json`;
  const res = await fetch(timingUrl);
  return res.text();
}

// Surah için tam SurahVideoData oluştur
export async function buildSurahData(surahNumber: number): Promise<SurahVideoData> {
  // 1. Ayet metinleri + mealler (Al-Quran Cloud)
  const texts = await fetchSurahTexts(surahNumber);

  // 2. Timing verisi (everyayah)
  const timingRaw = await fetchTimingFile(surahNumber);
  const timings   = parseEveryayahTimings(timingRaw, surahNumber);

  // 3. Birleştir
  const verses: VerseWithTiming[] = texts.map((t, i) => ({
    verseNumber: t.ayah,
    text:        t.arabic,
    translation: t.turkish,
    start:       (timings[i]?.startMs ?? i * 4000) / 1000, // ms → saniye
  }));

  const totalDuration =
    timings.length > 0
      ? (timings[timings.length - 1].startMs + timings[timings.length - 1].durationMs) / 1000
      : verses.length * 4;

  return {
    surahNumber,
    surahName:      texts[0] ? getSurahName(surahNumber) : `Sure ${surahNumber}`,
    surahNameArabic: getSurahNameArabic(surahNumber),
    totalDuration,
    verses,
  };
}

// Sure isimleri — hardcoded (değişmez)
const SURAH_NAMES_TR: Record<number, string> = {
  1: 'Fatiha', 2: 'Bakara', 3: 'Al-i İmran', 4: 'Nisa', 5: 'Maide',
  6: 'Enam', 7: 'Araf', 8: 'Enfal', 9: 'Tevbe', 10: 'Yunus',
  // ... devamı
  112: 'İhlas', 113: 'Felak', 114: 'Nas',
};

const SURAH_NAMES_AR: Record<number, string> = {
  1: 'الفاتحة', 2: 'البقرة', 3: 'آل عمران', 4: 'النساء', 5: 'المائدة',
  // ... devamı
  112: 'الإخلاص', 113: 'الفلق', 114: 'الناس',
};

export const getSurahName       = (n: number) => SURAH_NAMES_TR[n] ?? `Sure ${n}`;
export const getSurahNameArabic = (n: number) => SURAH_NAMES_AR[n] ?? '';