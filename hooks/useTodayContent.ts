import { useEffect, useMemo, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { dateToSeed, getDailyContentForDate, type DailyContent } from '../lib/dailyContent';

/** Gün değişince (gece yarısı) yenilenen günlük içerik. */
export function useTodayContent(): DailyContent {
  const [seed, setSeed] = useState(() => dateToSeed(new Date()));

  useEffect(() => {
    const refresh = () => {
      const next = dateToSeed(new Date());
      setSeed((prev) => (prev !== next ? next : prev));
    };

    const sub = AppState.addEventListener('change', (s: AppStateStatus) => {
      if (s === 'active') refresh();
    });

    const id = setInterval(refresh, 30_000);

    return () => {
      sub.remove();
      clearInterval(id);
    };
  }, []);

  return useMemo(() => getDailyContentForDate(new Date()), [seed]);
}
