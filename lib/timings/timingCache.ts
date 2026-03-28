// lib/timings/timingCache.ts
// AsyncStorage ile önbellek — bir kere çekilen sure tekrar çekilmez

import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildSurahData } from './buildSurahData';
import type { SurahVideoData } from '../videoSurahData';

const CACHE_VERSION = 'v1';
const key = (n: number) => `surah_data_${CACHE_VERSION}_${n}`;

export async function getSurahData(surahNumber: number): Promise<SurahVideoData> {
  // 1. Cache'e bak
  try {
    const cached = await AsyncStorage.getItem(key(surahNumber));
    if (cached) {
      console.log(`[Cache] Sure ${surahNumber} cache'den yüklendi`);
      return JSON.parse(cached);
    }
  } catch {}

  // 2. Build et + cache'e yaz
  console.log(`[Cache] Sure ${surahNumber} API'den çekiliyor...`);
  const data = await buildSurahData(surahNumber);
  await AsyncStorage.setItem(key(surahNumber), JSON.stringify(data));
  return data;
}

export async function clearSurahCache(surahNumber?: number) {
  if (surahNumber) {
    await AsyncStorage.removeItem(key(surahNumber));
  } else {
    // Tüm sure cache'ini temizle
    const keys = await AsyncStorage.getAllKeys();
    const surahKeys = keys.filter(k => k.startsWith('surah_data_'));
    await AsyncStorage.multiRemove(surahKeys);
  }
}