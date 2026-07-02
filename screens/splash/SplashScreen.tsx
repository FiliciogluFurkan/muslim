import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Polygon, Defs, RadialGradient, Stop } from 'react-native-svg';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FONT } from '../../lib/typography';

// İmza renkleri — uygulamanın zümrüt kimliğiyle uyumlu: derin yeşil + nane + altın.
const BG = '#0C221A';
const BG_GLOW = '#123A2B';
const GOLD = '#C9A24B';
const MINT = '#8FE6C0';
const CREAM = '#EAD9A8';

const TOTAL_DURATION = 2500;

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

  // Nefes alan dış parıltı (motif belirmeden önce, arka planda büyür)
  const glowOpacity = useSharedValue(0);
  const glowScale = useSharedValue(0.8);

  // Motif: giriş + sürekli yavaş dönüş
  const motifOpacity = useSharedValue(0);
  const motifScale = useSharedValue(0.72);
  const motifRotateIn = useSharedValue(-14);
  const spin = useSharedValue(0);

  // İç dolgu "nabız" atışı (motif yerleştikten sonra bir kez)
  const corePulse = useSharedValue(1);

  // Arapça logo
  const wordOpacity = useSharedValue(0);
  const wordTranslate = useSharedValue(14);
  const wordScale = useSharedValue(0.9);

  // Alt bilgi (kademeli)
  const nameOpacity = useSharedValue(0);
  const nameTranslate = useSharedValue(8);
  const dividerScale = useSharedValue(0);
  const subOpacity = useSharedValue(0);
  const subTranslate = useSharedValue(8);

  // Alt yükleme çizgisi
  const loadProgress = useSharedValue(0);

  useEffect(() => {
    // 0) Arka plan parıltısı nefes alır (sürekli)
    glowOpacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) });
    glowScale.value = withDelay(
      1000,
      withRepeat(
        withSequence(
          withTiming(1.08, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );

    // 1) Motif: yumuşak yaylı büyüme + hafif dönerek yerine oturma
    motifOpacity.value = withDelay(120, withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) }));
    motifScale.value = withDelay(120, withSpring(1, { damping: 11, stiffness: 90, mass: 0.9 }));
    motifRotateIn.value = withDelay(120, withSpring(0, { damping: 12, stiffness: 80 }));

    // Motif yerleşince bir kez "nabız" atar, sonra sürekli çok yavaş döner
    corePulse.value = withDelay(
      750,
      withSequence(
        withTiming(1.12, { duration: 220, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 320, easing: Easing.out(Easing.ease) }),
      ),
    );
    spin.value = withRepeat(withTiming(1, { duration: 80000, easing: Easing.linear }), -1, false);

    // 2) Arapça logo
    wordOpacity.value = withDelay(620, withTiming(1, { duration: 620, easing: Easing.out(Easing.cubic) }));
    wordTranslate.value = withDelay(620, withSpring(0, { damping: 14, stiffness: 110 }));
    wordScale.value = withDelay(620, withSpring(1, { damping: 13, stiffness: 100 }));

    // 3) Alt bilgi — kademeli (isim → çizgi → alt başlık)
    nameOpacity.value = withDelay(1080, withTiming(1, { duration: 500 }));
    nameTranslate.value = withDelay(1080, withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }));
    dividerScale.value = withDelay(1260, withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) }));
    subOpacity.value = withDelay(1380, withTiming(1, { duration: 500 }));
    subTranslate.value = withDelay(1380, withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }));

    // 4) Alt yükleme çizgisi — toplam süreye yayılır
    loadProgress.value = withDelay(
      300,
      withTiming(1, { duration: TOTAL_DURATION - 500, easing: Easing.out(Easing.cubic) }),
    );

    const timer = setTimeout(() => router.replace('/(tabs)'), TOTAL_DURATION);
    return () => clearTimeout(timer);
  }, []);

  const bgGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }));

  const motifStyle = useAnimatedStyle(() => ({
    opacity: motifOpacity.value,
    transform: [{ scale: motifScale.value * corePulse.value }, { rotate: `${motifRotateIn.value}deg` }],
  }));

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(spin.value, [0, 1], [0, 360])}deg` }],
  }));

  const wordStyle = useAnimatedStyle(() => ({
    opacity: wordOpacity.value,
    transform: [{ translateY: wordTranslate.value }, { scale: wordScale.value }],
  }));

  const nameStyle = useAnimatedStyle(() => ({
    opacity: nameOpacity.value,
    transform: [{ translateY: nameTranslate.value }],
  }));

  const dividerStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: dividerScale.value }],
  }));

  const subStyle = useAnimatedStyle(() => ({
    opacity: subOpacity.value,
    transform: [{ translateY: subTranslate.value }],
  }));

  const loadFillStyle = useAnimatedStyle(() => ({
    width: `${loadProgress.value * 100}%`,
  }));

  return (
    <View style={styles.root}>
      {/* Merkezden yayılan derinlik parıltısı */}
      <Animated.View style={[styles.bgGlow, bgGlowStyle]} pointerEvents="none" />

      {/* Ortalanmış motif + logo — flex ile merkezde, kayma yok */}
      <View style={styles.center}>
        <Animated.View style={motifStyle}>
          <View style={{ width: SIZE, height: SIZE }}>
            {/* Yavaş dönen dış motif */}
            <Animated.View style={[StyleSheet.absoluteFillObject, spinStyle]}>
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
            <Animated.Text style={[styles.arabicText, { width: SIZE, height: SIZE }, wordStyle]}>
              فُرقان
            </Animated.Text>
          </View>
        </Animated.View>
      </View>

      {/* Alt bilgi — güvenli alan içinde */}
      <View style={[styles.bottomMeta, { bottom: insets.bottom + 44 }]}>
        <Animated.Text style={[styles.appNameLatin, nameStyle]}>FURKAN</Animated.Text>
        <Animated.View style={[styles.divider, dividerStyle]} />
        <Animated.Text style={[styles.subtitle, subStyle]}>KUR'AN-I KERİM</Animated.Text>

        <View style={styles.loadTrack}>
          <Animated.View style={[styles.loadFill, loadFillStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  bgGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 520,
    height: 520,
    marginLeft: -260,
    marginTop: -260,
    borderRadius: 260,
    backgroundColor: BG_GLOW,
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
  loadTrack: {
    width: 84,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    marginTop: 18,
  },
  loadFill: {
    height: 2,
    borderRadius: 1,
    backgroundColor: MINT,
  },
});
