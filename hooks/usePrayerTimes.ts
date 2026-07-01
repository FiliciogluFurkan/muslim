import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as Location from 'expo-location';

import {
  calculatePrayerTimes,
  getNextPrayer,
  type PrayerTimesData,
  type KerahatPeriod,
} from '../lib/prayerTimes';
import { useMushafStore } from '../lib/store';

export type PrayerSlot = { name: string; time: Date; arabic: string };

export type PrayerStatus = 'loading' | 'ready' | 'needsLocation' | 'error';

export type PrayerTimesState = {
  status: PrayerStatus;
  city?: string;
  hijriDate?: string;
  source: 'manual' | 'gps' | null;
  times: PrayerTimesData | null;
  slots: PrayerSlot[];
  next: PrayerSlot | null;
  /** Kullanıcı hareketi: izin ister (prompt) ve GPS dener. */
  retry: () => void;
};

const HIJRI_MONTHS_TR: Record<number, string> = {
  1: 'Muharrem', 2: 'Safer', 3: 'Rebiülevvel', 4: 'Rebiülahir',
  5: 'Cemaziyelevvel', 6: 'Cemaziyelahir', 7: 'Recep', 8: 'Şaban',
  9: 'Ramazan', 10: 'Şevval', 11: 'Zilkade', 12: 'Zilhicce',
};

function formatHijri(h: any): string | undefined {
  if (!h) return undefined;
  const monthTr = HIJRI_MONTHS_TR[Number(h.month?.number)] ?? h.month?.en;
  if (!h.day || !monthTr || !h.year) return undefined;
  return `${h.day} ${monthTr} ${h.year}`;
}

function buildKerahat(prayers: PrayerTimesData['prayers']): KerahatPeriod[] {
  return [
    {
      name: 'Güneş Doğuşu',
      start: prayers.sunrise,
      end: new Date(prayers.sunrise.getTime() + 45 * 60000),
      type: 'sunrise',
    },
    {
      name: 'İstiva (Zeval)',
      start: new Date(prayers.dhuhr.getTime() - 15 * 60000),
      end: prayers.dhuhr,
      type: 'noon',
    },
    {
      name: 'Güneş Batışı',
      start: new Date(prayers.maghrib.getTime() - 15 * 60000),
      end: prayers.maghrib,
      type: 'sunset',
    },
  ];
}

/** Tek istekte namaz vakitleri (kerahat dahil) + hicri tarih; hata olursa yerel hesaplar. */
async function fetchTimesAndMeta(
  date: Date,
  latitude: number,
  longitude: number,
): Promise<{ data: PrayerTimesData; hijri?: string }> {
  try {
    const timestamp = Math.floor(date.getTime() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=13`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.code !== 200 || !json.data) throw new Error('API yanıtı geçersiz');

    const t = json.data.timings;
    const base = new Date(date);
    base.setHours(0, 0, 0, 0);
    const parse = (s: string): Date => {
      const [h, m] = String(s).split(':').map(Number);
      const d = new Date(base);
      d.setHours(h, m, 0, 0);
      return d;
    };
    const prayers = {
      imsak: parse(t.Imsak),
      fajr: parse(t.Fajr),
      sunrise: parse(t.Sunrise),
      dhuhr: parse(t.Dhuhr),
      asr: parse(t.Asr),
      maghrib: parse(t.Maghrib),
      isha: parse(t.Isha),
    };
    return {
      data: { date, prayers, kerahatPeriods: buildKerahat(prayers) },
      hijri: formatHijri(json.data.date?.hijri),
    };
  } catch {
    return { data: calculatePrayerTimes(date, latitude, longitude) };
  }
}

function toSlots(times: PrayerTimesData): PrayerSlot[] {
  return [
    { name: 'İmsak', time: times.prayers.imsak, arabic: 'الإمساك' },
    { name: 'Sabah', time: times.prayers.fajr, arabic: 'الفجر' },
    { name: 'Güneş', time: times.prayers.sunrise, arabic: 'الشروق' },
    { name: 'Öğle', time: times.prayers.dhuhr, arabic: 'الظهر' },
    { name: 'İkindi', time: times.prayers.asr, arabic: 'العصر' },
    { name: 'Akşam', time: times.prayers.maghrib, arabic: 'المغرب' },
    { name: 'Yatsı', time: times.prayers.isha, arabic: 'العشاء' },
  ];
}

/**
 * Namaz vakitlerini getirir. Öncelik: mağazada seçili sabit şehir (manualLocation).
 * Yoksa mevcut GPS iznini **sormadan** kullanır; izin yoksa veya cihaz konumu
 * kapalıysa `needsLocation` döner (kullanıcı şehir seçebilir ya da `retry()` ile izin verebilir).
 */
export function usePrayerTimes(): PrayerTimesState {
  const manualLocation = useMushafStore((s) => s.manualLocation);

  const [status, setStatus] = useState<PrayerStatus>('loading');
  const [source, setSource] = useState<'manual' | 'gps' | null>(null);
  const [city, setCity] = useState<string | undefined>();
  const [hijriDate, setHijriDate] = useState<string | undefined>();
  const [times, setTimes] = useState<PrayerTimesData | null>(null);
  const mounted = useRef(true);

  const applyResult = (data: PrayerTimesData, hijri?: string) => {
    if (!mounted.current) return;
    setTimes(data);
    setHijriDate(hijri);
    setStatus('ready');
  };

  const load = useCallback(
    async (askIfNeeded: boolean) => {
      // 1) Sabit şehir seçiliyse GPS'e hiç dokunma
      if (manualLocation) {
        if (mounted.current) {
          setSource('manual');
          setCity(manualLocation.city);
        }
        const r = await fetchTimesAndMeta(new Date(), manualLocation.latitude, manualLocation.longitude);
        applyResult(r.data, r.hijri);
        return;
      }

      // 2) Otomatik: izni sadece kullanıcı isterse (askIfNeeded) sor
      try {
        const perm = askIfNeeded
          ? await Location.requestForegroundPermissionsAsync()
          : await Location.getForegroundPermissionsAsync();

        if (!perm.granted) {
          if (mounted.current) setStatus('needsLocation');
          return;
        }

        if (mounted.current) {
          setSource('gps');
          setStatus((s) => (s === 'ready' ? s : 'loading'));
        }

        // Önce son bilinen konum (cihaz konumu kapalıyken bile çalışabilir)
        let coords: { latitude: number; longitude: number } | null = null;
        try {
          const last = await Location.getLastKnownPositionAsync({ maxAge: 3600000 });
          if (last) coords = { latitude: last.coords.latitude, longitude: last.coords.longitude };
        } catch {}

        // Güncel konum (cihaz konumu kapalıysa hata verir → yakalanır)
        try {
          const cur = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
          coords = { latitude: cur.coords.latitude, longitude: cur.coords.longitude };
        } catch {
          // güncel konum alınamadı; varsa son bilinen konumla devam ederiz
        }

        if (!coords) {
          // Ne son konum ne güncel konum var → şehir seçtir
          if (mounted.current) setStatus('needsLocation');
          return;
        }

        const r = await fetchTimesAndMeta(new Date(), coords.latitude, coords.longitude);
        applyResult(r.data, r.hijri);

        try {
          const [addr] = await Location.reverseGeocodeAsync(coords);
          if (mounted.current && addr) {
            setCity(addr.city || addr.district || addr.subregion || undefined);
          }
        } catch {}
      } catch {
        if (mounted.current) setStatus('needsLocation');
      }
    },
    [manualLocation],
  );

  useEffect(() => {
    mounted.current = true;
    setStatus('loading');
    load(false);

    const sub = AppState.addEventListener('change', (s: AppStateStatus) => {
      if (s === 'active') load(false);
    });
    return () => {
      mounted.current = false;
      sub.remove();
    };
  }, [load]);

  const slots = times ? toSlots(times) : [];
  const nextRaw = times ? getNextPrayer(times) : null;
  const next = nextRaw ? slots.find((s) => s.name === nextRaw.name) ?? null : null;

  return {
    status,
    city,
    hijriDate,
    source,
    times,
    slots,
    next,
    retry: () => load(true),
  };
}
