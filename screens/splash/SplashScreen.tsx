// SplashScreen.tsx
import { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Polygon, Defs, RadialGradient, Stop } from 'react-native-svg';
import { FONT } from '../../lib/typography';

// İmza renkleri — uygulamanın zümrüt kimliğiyle uyumlu: derin yeşil + nane + altın.
const BG = '#12271E';
const GOLD = '#C9A24B';
const MINT = '#8FE6C0';
const CREAM = '#EAD9A8';

// Motif sabit bir kare viewBox içinde çizilir → hiçbir ekranda kaymaz.
const SIZE = 300;
const C = SIZE / 2;
const R = SIZE * 0.4;

// 16 köşeli yıldız noktaları (dış/iç yarıçap değişimli)
const starPoints = (outer: number, inner: number, count = 8) =>
  [...Array(count * 2)]
    .map((_, i) => {
      const angle = (Math.PI / count) * i - Math.PI / 2;
      const r = i % 2 === 0 ? outer : inner;
      return `${C + r * Math.cos(angle)},${C + r * Math.sin(angle)}`;
    })
    .join(' ');

const polyPoints = (count: number, radius: number, offset = 0) =>
  [...Array(count)]
    .map((_, i) => {
      const angle = ((Math.PI * 2) / count) * i - Math.PI / 2 + offset;
      return `${C + radius * Math.cos(angle)},${C + radius * Math.sin(angle)}`;
    })
    .join(' ');

export default function SplashScreen() {
  const insets = useSafeAreaInsets();

  const motifOpacity = useRef(new Animated.Value(0)).current;
  const motifScale = useRef(new Animated.Value(0.85)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.9)).current;
  const metaOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1) Geometrik motif belirir + hafif yaylı büyüme
    Animated.parallel([
      Animated.timing(motifOpacity, {
        toValue: 1,
        duration: 900,
        delay: 120,
        useNativeDriver: true,
      }),
      Animated.spring(motifScale, {
        toValue: 1,
        friction: 7,
        tension: 45,
        delay: 120,
        useNativeDriver: true,
      }),
    ]).start();

    // Motif çok yavaş dönerek "canlı" durur
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 60000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // 2) Arapça logo
    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        delay: 650,
        useNativeDriver: true,
      }),
      Animated.spring(textScale, {
        toValue: 1,
        friction: 7,
        tension: 60,
        delay: 650,
        useNativeDriver: true,
      }),
    ]).start();

    // 3) Alt bilgi
    Animated.timing(metaOpacity, {
      toValue: 1,
      duration: 700,
      delay: 1150,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => router.replace('/(tabs)'), 2700);
    return () => clearTimeout(timer);
  }, []);

  const spinDeg = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.root}>
      {/* Ortalanmış motif + logo — flex ile merkezde, kayma yok */}
      <View style={styles.center}>
        <Animated.View
          style={{
            opacity: motifOpacity,
            transform: [{ scale: motifScale }],
          }}
        >
          <View style={{ width: SIZE, height: SIZE }}>
            {/* Yavaş dönen dış motif */}
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                { transform: [{ rotate: spinDeg }] },
              ]}
            >
              <Svg width={SIZE} height={SIZE}>
                <Defs>
                  <RadialGradient id="glow" cx="50%" cy="50%" rx="50%" ry="50%">
                    <Stop offset="0%" stopColor={GOLD} stopOpacity="0.16" />
                    <Stop offset="100%" stopColor={GOLD} stopOpacity="0" />
                  </RadialGradient>
                </Defs>

                <Circle cx={C} cy={C} r={R * 1.35} fill="url(#glow)" />

                {/* Dış ince çemberler (nane) */}
                <Circle cx={C} cy={C} r={R * 1.08} fill="none" stroke={MINT} strokeWidth={0.6} strokeOpacity={0.24} />
                <Circle cx={C} cy={C} r={R * 0.92} fill="none" stroke={MINT} strokeWidth={0.4} strokeOpacity={0.18} />

                {/* 8 kollu yıldız (altın) */}
                <Polygon points={starPoints(R * 0.8, R * 0.19)} fill="none" stroke={GOLD} strokeWidth={1.1} strokeOpacity={0.6} />

                {/* İç sekizgen (nane) */}
                <Polygon points={polyPoints(8, R * 0.39)} fill="none" stroke={MINT} strokeWidth={0.7} strokeOpacity={0.34} />

                {/* Köşe noktaları (altın) */}
                {[0, 1, 2, 3].map((i) => {
                  const angle = (Math.PI / 2) * i - Math.PI / 2;
                  return (
                    <Circle
                      key={`o${i}`}
                      cx={C + R * 0.8 * Math.cos(angle)}
                      cy={C + R * 0.8 * Math.sin(angle)}
                      r={3}
                      fill={GOLD}
                      fillOpacity={0.75}
                    />
                  );
                })}
              </Svg>
            </Animated.View>

            {/* Sabit iç dolgu dairesi (dönmüyor) */}
            <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFillObject}>
              <Circle
                cx={C}
                cy={C}
                r={R * 0.34}
                fill="rgba(201,162,75,0.07)"
                stroke={GOLD}
                strokeWidth={0.8}
                strokeOpacity={0.5}
              />
            </Svg>

            {/* Arapça logo — motifin tam ortasında */}
            <Animated.Text
              style={[
                styles.arabicText,
                {
                  width: SIZE,
                  height: SIZE,
                  opacity: textOpacity,
                  transform: [{ scale: textScale }],
                },
              ]}
            >
              فُرقان
            </Animated.Text>
          </View>
        </Animated.View>
      </View>

      {/* Alt bilgi — güvenli alan içinde */}
      <Animated.View
        style={[
          styles.bottomMeta,
          { opacity: metaOpacity, bottom: insets.bottom + 48 },
        ]}
      >
        <Text style={styles.appNameLatin}>FURKAN</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>KUR'AN-I KERİM</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arabicText: {
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: SIZE,
    fontFamily: 'Amiri_700Bold',
    fontSize: 62,
    color: CREAM,
    letterSpacing: 2,
  },
  bottomMeta: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 10,
  },
  appNameLatin: {
    fontFamily: FONT.bold,
    color: GOLD,
    fontSize: 13,
    letterSpacing: 8,
    opacity: 0.85,
  },
  divider: {
    width: 44,
    height: 1,
    backgroundColor: GOLD,
    opacity: 0.45,
  },
  subtitle: {
    fontFamily: FONT.semibold,
    color: CREAM,
    fontSize: 11,
    letterSpacing: 4,
    opacity: 0.5,
  },
});
