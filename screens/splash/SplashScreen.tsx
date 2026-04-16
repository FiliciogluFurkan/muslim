// SplashScreen.tsx
import { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Svg, { Circle, Polygon, Line, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const CX = width / 2;
const R = Math.min(width, height) * 0.38; // yıldız yarıçapı

export default function SplashScreen() {
  const ringOpacity  = useRef(new Animated.Value(0)).current;
  const ringScale    = useRef(new Animated.Value(0.88)).current;
  const textOpacity  = useRef(new Animated.Value(0)).current;
  const textSlide    = useRef(new Animated.Value(15)).current;
  const subOpacity   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1) Geometrik motif beliriyor
    Animated.parallel([
      Animated.timing(ringOpacity, {
        toValue: 1, duration: 1000, delay: 150, useNativeDriver: true,
      }),
      Animated.spring(ringScale, {
        toValue: 1, friction: 8, tension: 50, delay: 150, useNativeDriver: true,
      }),
    ]).start();

    // 2) Arapça yazı
    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 1, duration: 800, delay: 700, useNativeDriver: true,
      }),
      Animated.timing(textSlide, {
        toValue: 0, duration: 800, delay: 700, useNativeDriver: true,
      }),
    ]).start();

    // 3) Alt yazı
    Animated.timing(subOpacity, {
      toValue: 1, duration: 600, delay: 1200, useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => router.replace('/(tabs)'), 2800);
    return () => clearTimeout(timer);
  }, []);

  // 8 köşeli yıldız noktaları
  const star = (r1: number, r2: number, points = 8) => {
    const pts: string[] = [];
    for (let i = 0; i < points * 2; i++) {
      const angle = (Math.PI / points) * i - Math.PI / 2;
      const r = i % 2 === 0 ? r1 : r2;
      pts.push(`${CX + r * Math.cos(angle)},${height / 2 + r * Math.sin(angle)}`);
    }
    return pts.join(' ');
  };

  const MY = height / 2 - 30; // dikey merkez (yazıya yer bırakmak için biraz yukarı)

  return (
    <View style={styles.root}>
      {/* SVG geometrik arka plan katmanı */}
      <Animated.View style={{ opacity: ringOpacity, transform: [{ scale: ringScale }], ...StyleSheet.absoluteFillObject }}>
        <Svg width={width} height={height}>
          <Defs>
            <RadialGradient id="glow" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#c9963a" stopOpacity="0.18" />
              <Stop offset="100%" stopColor="#c9963a" stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Ambient glow */}
          <Circle cx={CX} cy={MY} r={R * 1.4} fill="url(#glow)" />

          {/* Dış ince çemberler */}
          <Circle cx={CX} cy={MY} r={R * 1.08} fill="none" stroke="#c9963a" strokeWidth={0.6} strokeOpacity={0.3} />
          <Circle cx={CX} cy={MY} r={R * 0.92} fill="none" stroke="#c9963a" strokeWidth={0.4} strokeOpacity={0.2} />

          {/* 8 kollu yıldız */}
          <Polygon
            points={[...Array(16)].map((_, i) => {
              const angle = (Math.PI / 8) * i - Math.PI / 2;
              const r = i % 2 === 0 ? R * 0.8 : R * 0.19;
              return `${CX + r * Math.cos(angle)},${MY + r * Math.sin(angle)}`;
            }).join(' ')}
            fill="none" stroke="#c9963a" strokeWidth={1} strokeOpacity={0.55}
          />

          {/* İç kare 45° */}
          <Polygon
            points={[0, 1, 2, 3].map(i => {
              const angle = (Math.PI / 2) * i + Math.PI / 4;
              const r = R * 0.57;
              return `${CX + r * Math.cos(angle)},${MY + r * Math.sin(angle)}`;
            }).join(' ')}
            fill="none" stroke="#c9963a" strokeWidth={0.8} strokeOpacity={0.4}
          />

          {/* İç sekizgen -->  */}
          <Polygon
            points={[...Array(8)].map((_, i) => {
              const angle = (Math.PI / 4) * i - Math.PI / 2;
              const r = R * 0.39;
              return `${CX + r * Math.cos(angle)},${MY + r * Math.sin(angle)}`;
            }).join(' ')}
            fill="none" stroke="#c9963a" strokeWidth={0.7} strokeOpacity={0.35}
          />

          {/* İç dolgu dairesi */}
          <Circle cx={CX} cy={MY} r={R * 0.335}
            fill="rgba(201,150,58,0.06)" stroke="#c9963a" strokeWidth={0.8} strokeOpacity={0.5} />

          {/* 4 ana köşe noktası */}
          {[0, 1, 2, 3].map(i => {
            const angle = (Math.PI / 2) * i - Math.PI / 2;
            return <Circle key={i} cx={CX + R * 0.8 * Math.cos(angle)} cy={MY + R * 0.8 * Math.sin(angle)} r={3} fill="#c9963a" fillOpacity={0.7} />;
          })}

          {/* Ara noktalar */}
          {[1, 3, 5, 7].map(i => {
            const angle = (Math.PI / 4) * i - Math.PI / 4;
            return <Circle key={i} cx={CX + R * 0.565 * Math.cos(angle)} cy={MY + R * 0.565 * Math.sin(angle)} r={2} fill="#c9963a" fillOpacity={0.35} />;
          })}
        </Svg>
      </Animated.View>

      {/* Arapça logo yazısı */}
      <Animated.Text
        style={[
          styles.arabicText,
          { top: MY - 60, opacity: textOpacity, transform: [{ translateY: textSlide }] },
        ]}
      >
        فُرقان
      </Animated.Text>

      {/* Alt bilgi */}
      <Animated.View style={[styles.bottomMeta, { opacity: subOpacity }]}>
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
    backgroundColor: '#0e0b06',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arabicText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Amiri_700Bold',
    fontSize: 68,
    color: '#dfc47a',
    letterSpacing: 4,
  },
  bottomMeta: {
    position: 'absolute',
    bottom: 90,
    alignItems: 'center',
    gap: 10,
  },
  appNameLatin: {
    color: '#c9963a',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 8,
    opacity: 0.75,
  },
  divider: {
    width: 40,
    height: 0.5,
    backgroundColor: '#c9963a',
    opacity: 0.4,
  },
  subtitle: {
    color: '#c9963a',
    fontSize: 11,
    letterSpacing: 4,
    opacity: 0.45,
  },
});