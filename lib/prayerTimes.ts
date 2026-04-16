// lib/prayerTimes.ts
// Namaz vakitleri ve kerahat vakitleri hesaplamaları

export type PrayerTime = {
  name: string;
  time: Date;
  arabicName: string;
};

export type KerahatPeriod = {
  name: string;
  start: Date;
  end: Date;
  type: 'sunrise' | 'noon' | 'sunset';
};

export type PrayerTimesData = {
  date: Date;
  prayers: {
    imsak: Date;
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    maghrib: Date;
    isha: Date;
  };
  kerahatPeriods: KerahatPeriod[];
};

// API ile gerçek namaz vakitlerini al
export async function fetchPrayerTimesFromAPI(
  date: Date,
  latitude: number,
  longitude: number
): Promise<PrayerTimesData> {
  try {
    const timestamp = Math.floor(date.getTime() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=13`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code !== 200 || !data.data) {
      throw new Error('API yanıtı geçersiz');
    }

    const timings = data.data.timings;
    const baseDate = new Date(date);
    baseDate.setHours(0, 0, 0, 0);

    // API'den gelen saatleri Date objesine çevir
    const parseTime = (timeStr: string): Date => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const d = new Date(baseDate);
      d.setHours(hours, minutes, 0, 0);
      return d;
    };

    const prayers = {
      imsak: parseTime(timings.Imsak),
      fajr: parseTime(timings.Fajr),
      sunrise: parseTime(timings.Sunrise),
      dhuhr: parseTime(timings.Dhuhr),
      asr: parseTime(timings.Asr),
      maghrib: parseTime(timings.Maghrib),
      isha: parseTime(timings.Isha),
    };

    // Kerahat vakitleri
    const kerahatPeriods: KerahatPeriod[] = [
      {
        name: 'Güneş Doğuşu',
        start: prayers.sunrise,
        end: new Date(prayers.sunrise.getTime() + 45 * 60 * 1000),
        type: 'sunrise',
      },
      {
        name: 'İstiva (Zeval)',
        start: new Date(prayers.dhuhr.getTime() - 15 * 60 * 1000),
        end: prayers.dhuhr,
        type: 'noon',
      },
      {
        name: 'Güneş Batışı',
        start: new Date(prayers.maghrib.getTime() - 15 * 60 * 1000),
        end: prayers.maghrib,
        type: 'sunset',
      },
    ];

    return {
      date,
      prayers,
      kerahatPeriods,
    };
  } catch (error) {
    console.error('API hatası, varsayılan değerler kullanılıyor:', error);
    // Hata durumunda varsayılan hesaplama
    return calculatePrayerTimes(date, latitude, longitude);
  }
}

// Basit bir hesaplama - yedek olarak kullanılır
export function calculatePrayerTimes(date: Date, latitude: number, longitude: number): PrayerTimesData {
  // Örnek sabitler (İstanbul için yaklaşık)
  const baseDate = new Date(date);
  baseDate.setHours(0, 0, 0, 0);

  const prayers = {
    imsak: new Date(baseDate.getTime() + 4 * 60 * 60 * 1000 + 30 * 60 * 1000), // 04:30
    fajr: new Date(baseDate.getTime() + 4 * 60 * 60 * 1000 + 45 * 60 * 1000),  // 04:45
    sunrise: new Date(baseDate.getTime() + 6 * 60 * 60 * 1000 + 15 * 60 * 1000), // 06:15
    dhuhr: new Date(baseDate.getTime() + 12 * 60 * 60 * 1000 + 30 * 60 * 1000), // 12:30
    asr: new Date(baseDate.getTime() + 15 * 60 * 60 * 1000 + 45 * 60 * 1000),   // 15:45
    maghrib: new Date(baseDate.getTime() + 18 * 60 * 60 * 1000 + 30 * 60 * 1000), // 18:30
    isha: new Date(baseDate.getTime() + 20 * 60 * 60 * 1000),                    // 20:00
  };

  // Kerahat vakitleri
  const kerahatPeriods: KerahatPeriod[] = [
    {
      name: 'Güneş Doğuşu',
      start: prayers.sunrise,
      end: new Date(prayers.sunrise.getTime() + 45 * 60 * 1000), // 45 dakika
      type: 'sunrise',
    },
    {
      name: 'İstiva (Zeval)',
      start: new Date(prayers.dhuhr.getTime() - 15 * 60 * 1000), // 15 dk önce
      end: prayers.dhuhr,
      type: 'noon',
    },
    {
      name: 'Güneş Batışı',
      start: new Date(prayers.maghrib.getTime() - 15 * 60 * 1000), // 15 dk önce
      end: prayers.maghrib,
      type: 'sunset',
    },
  ];

  return {
    date,
    prayers,
    kerahatPeriods,
  };
}

export function getNextPrayer(times: PrayerTimesData): { name: string; time: Date; arabicName: string } | null {
  const now = new Date();
  const prayerList: PrayerTime[] = [
    { name: 'İmsak', time: times.prayers.imsak, arabicName: 'الإمساك' },
    { name: 'Sabah', time: times.prayers.fajr, arabicName: 'الفجر' },
    { name: 'Güneş', time: times.prayers.sunrise, arabicName: 'الشروق' },
    { name: 'Öğle', time: times.prayers.dhuhr, arabicName: 'الظهر' },
    { name: 'İkindi', time: times.prayers.asr, arabicName: 'العصر' },
    { name: 'Akşam', time: times.prayers.maghrib, arabicName: 'المغرب' },
    { name: 'Yatsı', time: times.prayers.isha, arabicName: 'العشاء' },
  ];

  for (const prayer of prayerList) {
    if (prayer.time > now) {
      return prayer;
    }
  }

  return null;
}

export function getCurrentKerahatStatus(times: PrayerTimesData): {
  isKerahat: boolean;
  isWarning: boolean;
  period?: KerahatPeriod;
  minutesUntil?: number;
} {
  const now = new Date();

  // Kerahat vaktinde mi kontrol et
  for (const period of times.kerahatPeriods) {
    if (now >= period.start && now <= period.end) {
      return {
        isKerahat: true,
        isWarning: false,
        period,
      };
    }

    // 15 dakika öncesi uyarı
    const warningTime = new Date(period.start.getTime() - 15 * 60 * 1000);
    if (now >= warningTime && now < period.start) {
      const minutesUntil = Math.ceil((period.start.getTime() - now.getTime()) / (60 * 1000));
      return {
        isKerahat: false,
        isWarning: true,
        period,
        minutesUntil,
      };
    }
  }

  return {
    isKerahat: false,
    isWarning: false,
  };
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

export function getTimeUntil(targetTime: Date): string {
  const now = new Date();
  const diff = targetTime.getTime() - now.getTime();

  if (diff < 0) return 'Geçti';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours}s ${minutes}dk`;
  } else if (minutes > 0) {
    return `${minutes}dk ${seconds}sn`;
  } else {
    return `${seconds}sn`;
  }
}
