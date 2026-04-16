import { useEffect, useState } from 'react';
import { ScrollView, Text, View, Linking, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

import {
  fetchPrayerTimesFromAPI,
  getNextPrayer,
  getCurrentKerahatStatus,
  formatTime,
  type PrayerTimesData,
} from '../../lib/prayerTimes';
import { styles, THEME } from './PrayerTimesScreen.styles';

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

const PRAYER_ICONS: Record<string, string> = {
  İmsak: '🌙',
  Sabah: '🌅',
  Güneş: '☀️',
  Öğle: '🌞',
  İkindi: '🌤️',
  Akşam: '🌆',
  Yatsı: '🌃',
};

export default function PrayerTimesScreen() {
  const insets = useSafeAreaInsets();
  const [times, setTimes] = useState<PrayerTimesData | null>(null);
  const [now, setNow] = useState(new Date());
  const [location, setLocation] = useState<{ latitude: number; longitude: number; city?: string } | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    async function getLocationAndPrayerTimes() {
      try {
        // Konum izni iste
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setPermissionDenied(true);
          return;
        }

        // Önce son bilinen konumu al (hızlı)
        let latitude = 41.0082;
        let longitude = 28.9784;
        let useLastKnown = false;

        try {
          const lastKnown = await Location.getLastKnownPositionAsync({
            maxAge: 600000, // 10 dakika
            requiredAccuracy: 1000, // 1km
          });
          
          if (lastKnown) {
            latitude = lastKnown.coords.latitude;
            longitude = lastKnown.coords.longitude;
            useLastKnown = true;
            
            // Hızlıca namaz vakitlerini göster
            const prayerTimesData = await fetchPrayerTimesFromAPI(new Date(), latitude, longitude);
            setTimes(prayerTimesData);
            setLocation({ latitude, longitude });
          }
        } catch (error) {
          console.log('Son konum alınamadı, güncel konum alınıyor...');
        }

        // Arka planda güncel konumu al (daha doğru)
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 0,
        });

        const { latitude: newLat, longitude: newLng } = currentLocation.coords;

        // Eğer konum değiştiyse güncelle
        if (!useLastKnown || Math.abs(newLat - latitude) > 0.01 || Math.abs(newLng - longitude) > 0.01) {
          latitude = newLat;
          longitude = newLng;

          // Şehir adını al
          try {
            const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
            setLocation({ 
              latitude, 
              longitude, 
              city: address.city || address.district || 'Bilinmeyen Konum' 
            });
          } catch {
            setLocation({ latitude, longitude });
          }

          // Namaz vakitlerini güncelle
          const prayerTimesData = await fetchPrayerTimesFromAPI(new Date(), latitude, longitude);
          setTimes(prayerTimesData);
        } else if (useLastKnown) {
          // Şehir adını al
          try {
            const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
            setLocation({ 
              latitude, 
              longitude, 
              city: address.city || address.district || 'Bilinmeyen Konum' 
            });
          } catch {
            setLocation({ latitude, longitude });
          }
        }
      } catch (error) {
        console.error('Konum alınamadı:', error);
        setPermissionDenied(true);
      }
    }

    getLocationAndPrayerTimes();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (permissionDenied) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 12 }]}>
        <StatusBar style="light" />
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: insets.bottom + 40, justifyContent: 'center', alignItems: 'center', flex: 1 },
          ]}
        >
          <View style={{ alignItems: 'center', paddingHorizontal: 32 }}>
            <Text style={{ fontSize: 64, marginBottom: 24 }}>📍</Text>
            <Text style={[styles.headerTitle, { textAlign: 'center', marginBottom: 12 }]}>
              Konum İzni Gerekli
            </Text>
            <Text style={[styles.headerDate, { textAlign: 'center', marginBottom: 32, lineHeight: 24 }]}>
              Namaz vakitlerini konumunuza göre hesaplayabilmek için konum iznine ihtiyacımız var.
            </Text>
            
            <TouchableOpacity
              style={{
                backgroundColor: THEME.accent,
                paddingHorizontal: 32,
                paddingVertical: 16,
                borderRadius: 12,
                marginBottom: 16,
              }}
              onPress={() => {
                Linking.openSettings();
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
                Ayarları Aç
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                paddingHorizontal: 32,
                paddingVertical: 16,
              }}
              onPress={() => {
                setPermissionDenied(false);
                // Tekrar dene
                (async () => {
                  try {
                    const { status } = await Location.requestForegroundPermissionsAsync();
                    if (status === 'granted') {
                      const currentLocation = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                      });
                      const { latitude, longitude } = currentLocation.coords;
                      try {
                        const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
                        setLocation({ 
                          latitude, 
                          longitude, 
                          city: address.city || address.district || 'Bilinmeyen Konum' 
                        });
                      } catch {
                        setLocation({ latitude, longitude });
                      }
                      const prayerTimesData = await fetchPrayerTimesFromAPI(new Date(), latitude, longitude);
                      setTimes(prayerTimesData);
                    } else {
                      setPermissionDenied(true);
                    }
                  } catch (error) {
                    setPermissionDenied(true);
                  }
                })();
              }}
            >
              <Text style={{ color: THEME.accent, fontSize: 16, fontWeight: '600' }}>
                Tekrar Dene
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (!times) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 12, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  const nextPrayer = getNextPrayer(times);
  const kerahat = getCurrentKerahatStatus(times);
  const msLeft = nextPrayer ? nextPrayer.time.getTime() - now.getTime() : 0;
  const countdown = formatCountdown(msLeft);

  const counterColor = kerahat.isKerahat
    ? THEME.danger
    : kerahat.isWarning
    ? THEME.warning
    : THEME.accent;

  const nowMs = now.getTime();

  const prayerList = [
    { name: 'İmsak', time: times.prayers.imsak, arabic: 'الإمساك' },
    { name: 'Sabah', time: times.prayers.fajr, arabic: 'الفجر' },
    { name: 'Güneş', time: times.prayers.sunrise, arabic: 'الشروق' },
    { name: 'Öğle', time: times.prayers.dhuhr, arabic: 'الظهر' },
    { name: 'İkindi', time: times.prayers.asr, arabic: 'العصر' },
    { name: 'Akşam', time: times.prayers.maghrib, arabic: 'المغرب' },
    { name: 'Yatsı', time: times.prayers.isha, arabic: 'العشاء' },
  ];

  const nextIdx = prayerList.findIndex((p) => p.time.getTime() > nowMs);
  const prevMs = nextIdx > 0 ? prayerList[nextIdx - 1].time.getTime() : nowMs;
  const nextMs = nextPrayer?.time.getTime() ?? nowMs;

  const progress =
    nextMs > prevMs
      ? Math.min(1, (nowMs - prevMs) / (nextMs - prevMs))
      : 0;

  const dateStr = now.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={[styles.root, { paddingTop: insets.top + 12 }]}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerEyebrow}>{location?.city || 'Konum'}</Text>
          <Text style={styles.headerTitle}>Namaz Vakitleri</Text>
          <Text style={styles.headerDate}>{dateStr}</Text>
        </View>

        {nextPrayer && (
          <View style={styles.heroCard}>
            <View style={styles.heroHeaderRow}>
              <Text style={styles.heroLabel}>Sıradaki Vakit</Text>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>AKTİF TAKİP</Text>
              </View>
            </View>

            <View style={styles.heroPrayerRow}>
              <View>
                <Text style={styles.heroPrayerName}>{nextPrayer.name}</Text>
                <Text style={styles.heroPrayerArabic}>{nextPrayer.arabicName}</Text>
              </View>

              <View style={styles.heroTimePill}>
                <Text style={styles.heroTimePillText}>
                  {formatTime(nextPrayer.time)}
                </Text>
              </View>
            </View>

            <Text style={[styles.heroCountdown, { color: counterColor }]}>
              {countdown}
            </Text>
            <Text style={styles.heroSub}>vakte kalan süre</Text>

            <View style={styles.heroProgressTrack}>
              <View
                style={[
                  styles.heroProgressFill,
                  {
                    width: `${Math.round(progress * 100)}%`,
                    backgroundColor: counterColor,
                  },
                ]}
              />
            </View>
          </View>
        )}

        {(kerahat.isKerahat || kerahat.isWarning) && (
          <View
            style={[
              styles.alertCard,
              kerahat.isKerahat ? styles.alertCardDanger : styles.alertCardWarn,
            ]}
          >
            <View
              style={[
                styles.alertDot,
                {
                  backgroundColor: kerahat.isKerahat
                    ? THEME.danger
                    : THEME.warning,
                },
              ]}
            />
            <Text
              style={[
                styles.alertText,
                { color: kerahat.isKerahat ? '#FFD6D0' : '#F7D9A7' },
              ]}
            >
              {kerahat.isKerahat
                ? `Kerahat vakti — ${formatTime(
                    kerahat.period!.end,
                  )} kadar nafile namaz mekruhtur.`
                : `Kerahat vaktine ${kerahat.minutesUntil} dakika kaldı — nafile namazı tamamla.`}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Tüm Vakitler</Text>
        <View style={styles.listCard}>
          {prayerList.map((prayer, idx) => {
            const isNext = nextPrayer?.name === prayer.name;
            const isPassed = prayer.time.getTime() < nowMs && !isNext;
            const isLast = idx === prayerList.length - 1;

            return (
              <View
                key={prayer.name}
                style={[
                  styles.prayerRow,
                  !isLast && styles.prayerRowBorder,
                ]}
              >
                <View style={styles.prayerLeft}>
                  <View
                    style={[
                      styles.prayerIconWrap,
                      isNext && styles.prayerIconWrapActive,
                    ]}
                  >
                    <Text style={styles.prayerIcon}>
                      {PRAYER_ICONS[prayer.name] ?? '🕌'}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.prayerName,
                        isNext && styles.prayerNameActive,
                        isPassed && styles.prayerNamePassed,
                      ]}
                    >
                      {prayer.name}
                    </Text>
                    <Text style={styles.prayerArabic}>{prayer.arabic}</Text>
                  </View>
                </View>

                <View style={styles.prayerRight}>
                  {isNext && (
                    <View style={styles.inlineBadge}>
                      <Text style={styles.inlineBadgeText}>SIRADA</Text>
                    </View>
                  )}
                  <Text
                    style={[
                      styles.prayerTime,
                      isNext && styles.prayerTimeActive,
                      isPassed && styles.prayerTimePassed,
                    ]}
                  >
                    {formatTime(prayer.time)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Kerahat Vakitleri</Text>
        <View style={styles.kerahatCard}>
          {times.kerahatPeriods.map((period, i) => {
            const isLast = i === times.kerahatPeriods.length - 1;

            return (
              <View
                key={i}
                style={[
                  styles.kerahatRow,
                  !isLast && styles.kerahatRowBorder,
                ]}
              >
                <View style={styles.kerahatLeft}>
                  <View style={styles.kerahatDot} />
                  <Text style={styles.kerahatName}>{period.name}</Text>
                </View>

                <Text style={styles.kerahatRange}>
                  {formatTime(period.start)} – {formatTime(period.end)}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.ornament}>✦ ✦ ✦</Text>
      </ScrollView>
    </View>
  );
}