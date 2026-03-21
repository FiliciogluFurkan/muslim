import { Platform } from 'react-native';

import { isExpoGo } from './expoRuntime';
import { getDailyContentForDate } from './dailyContent';
import { getSurahNameTurkish } from './surahNames';
import { getTranslation } from './quranData';
import { buildVerseWidgetTimeline } from './widgetPayload';
import { persistWidgetPayload, type StoredWidgetPayload } from './widgetStorage';

function buildPayloadFromDate(d: Date): StoredWidgetPayload {
  const c = getDailyContentForDate(d);
  const surahName = getSurahNameTurkish(c.verse.surah_number);
  const turkish = getTranslation(c.verse.surah_number, c.verse.verse_number, 'diyanet');
  return {
    dateSeed: c.dateSeed,
    arabic: c.verse.arabic,
    turkish,
    surahLabel: `${surahName} ${c.verse.surah_number}:${c.verse.verse_number}`,
    hadithText: c.hadith.text_turkish,
    hadithSource: c.hadith.source,
  };
}

async function refreshIosWidgets(): Promise<void> {
  const VerseWidget = require('../widgets/VerseWidget').default;
  const timeline = buildVerseWidgetTimeline(21);
  VerseWidget.updateTimeline(timeline);
}

async function refreshAndroidWidgets(): Promise<void> {
  const { requestWidgetUpdate } = require('react-native-android-widget') as typeof import('react-native-android-widget');
  await requestWidgetUpdate({
    widgetName: 'MushafVerse',
    renderWidget: async () => {
      const { renderAndroidVerseWidget } = await import('../widgets/AndroidVerseWidget');
      return renderAndroidVerseWidget();
    },
  });
}

/** Bugünün içeriğini paylaşımlı depoya yazar ve widget’ları günceller. */
export async function syncWidgetsAndStorage(): Promise<void> {
  const payload = buildPayloadFromDate(new Date());
  await persistWidgetPayload(payload);

  // Expo Go: expo-widgets / android-widget native modülleri yok; yalnızca depolama güncellenir.
  if (isExpoGo()) {
    return;
  }

  if (Platform.OS === 'ios') {
    await refreshIosWidgets();
  } else if (Platform.OS === 'android') {
    await refreshAndroidWidgets();
  }
}

export type { StoredWidgetPayload };
