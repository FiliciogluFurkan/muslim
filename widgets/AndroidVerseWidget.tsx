import { FlexWidget, TextWidget } from 'react-native-android-widget';

import { getDailyContentForDate } from '../lib/dailyContent';
import { getSurahNameTurkish } from '../lib/surahNames';
import { getTranslation } from '../lib/quranData';
import { loadWidgetPayload, type StoredWidgetPayload } from '../lib/widgetStorage';

function payloadFromDaily(): StoredWidgetPayload {
  const c = getDailyContentForDate(new Date());
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

export async function renderAndroidVerseWidget() {
  const stored = await loadWidgetPayload();
  const p = stored ?? payloadFromDaily();

  return (
    <FlexWidget
      style={{
        flexDirection: 'column',
        flexGap: 8,
        padding: 14,
        backgroundColor: '#121214',
        width: 'match_parent',
        height: 'match_parent',
      }}
    >
      <TextWidget
        text={p.arabic}
        maxLines={4}
        style={{
          fontSize: 18,
          color: '#f2f2f0',
          textAlign: 'right',
        }}
      />
      <TextWidget
        text={p.turkish}
        maxLines={5}
        style={{
          fontSize: 14,
          color: '#9a9a9a',
          textAlign: 'left',
        }}
      />
      <TextWidget
        text={p.surahLabel}
        style={{
          fontSize: 12,
          color: '#6b6b6b',
        }}
      />
    </FlexWidget>
  );
}
