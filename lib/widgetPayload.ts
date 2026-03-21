import { getDailyContentForDate } from './dailyContent';
import { getSurahNameTurkish } from './surahNames';
import { getTranslation } from './quranData';

export type VerseWidgetProps = {
  arabic: string;
  turkish: string;
  surahLabel: string;
};

export type VerseTimelineEntry = {
  date: Date;
  props: VerseWidgetProps;
};

/** Yerel gün başlangıcı (00:00). */
export function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

/**
 * iOS WidgetKit için gece yarısı güncellemeleri (SDK 55+ expo-widgets ile kullanılır).
 * Şu an `VerseWidget` no-op; SDK 55'e geçince gerçek timeline bağlanır.
 */
export function buildVerseWidgetTimeline(daysAhead: number): VerseTimelineEntry[] {
  const entries: VerseTimelineEntry[] = [];
  const todayStart = startOfLocalDay(new Date());
  for (let i = 0; i < daysAhead; i++) {
    const day = new Date(todayStart);
    day.setDate(todayStart.getDate() + i);
    const c = getDailyContentForDate(day);
    const surahName = getSurahNameTurkish(c.verse.surah_number);
    const turkish = getTranslation(c.verse.surah_number, c.verse.verse_number, 'diyanet');
    entries.push({
      date: day,
      props: {
        arabic: c.verse.arabic,
        turkish,
        surahLabel: `${surahName} ${c.verse.surah_number}:${c.verse.verse_number}`,
      },
    });
  }
  return entries;
}
