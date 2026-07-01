import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Phase = 'dawn' | 'day' | 'dusk' | 'night';

function phaseFor(hour: number): Phase {
  if (hour >= 6 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'dusk';
  return 'night';
}

const COLORS: Record<Phase, { sky: string; body: string; ray: string; skyTo: string }> = {
  dawn: { sky: '#F6C99A', skyTo: '#EFA97A', body: '#F5943C', ray: '#FBDCA6' },
  day: { sky: '#8FD0F0', skyTo: '#6FBFEA', body: '#F6B23A', ray: '#FBD46A' },
  dusk: { sky: '#EC9A5A', skyTo: '#D96E62', body: '#F0762F', ray: '#F8BE86' },
  night: { sky: '#26325A', skyTo: '#1A2340', body: '#EDE7D6', ray: '#FBF6E4' },
};

/** Saate göre güneş (dönen ışınlar) veya ay (ışıldayan yıldızlar) gösteren küçük rozet. */
export function CelestialBadge({ hour, size = 54 }: { hour: number; size?: number }) {
  const phase = phaseFor(hour);
  const c = COLORS[phase];
  const isNight = phase === 'night';

  const spin = useSharedValue(0);
  const twinkle = useSharedValue(0);

  useEffect(() => {
    if (isNight) {
      twinkle.value = withRepeat(withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }), -1, true);
    } else {
      spin.value = withRepeat(withTiming(1, { duration: 22000, easing: Easing.linear }), -1, false);
    }
  }, [isNight]);

  const rayStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));
  const star1 = useAnimatedStyle(() => ({ opacity: 0.35 + twinkle.value * 0.65 }));
  const star2 = useAnimatedStyle(() => ({ opacity: 0.9 - twinkle.value * 0.6 }));

  const bodySize = size * 0.42;

  return (
    <View
      style={[
        styles.wrap,
        { width: size, height: size, borderRadius: size * 0.34, backgroundColor: c.sky },
      ]}
    >
      {/* alt yarıda koyulaşan gökyüzü hissi */}
      <View style={[StyleSheet.absoluteFillObject, styles.skyBottom, { backgroundColor: c.skyTo }]} />

      {isNight ? (
        <>
          <Animated.View style={[styles.star, { top: size * 0.2, left: size * 0.24, backgroundColor: c.ray }, star1]} />
          <Animated.View style={[styles.star, { top: size * 0.66, left: size * 0.7, backgroundColor: c.ray }, star2]} />
          <Animated.View style={[styles.starSm, { top: size * 0.5, left: size * 0.22, backgroundColor: c.ray }, star2]} />
          {/* hilal: dolu ay + gökyüzü renginde ofset daire ile oyulur */}
          <View style={[styles.moon, { width: bodySize, height: bodySize, borderRadius: bodySize / 2, backgroundColor: c.body }]}>
            <View
              style={{
                position: 'absolute',
                width: bodySize,
                height: bodySize,
                borderRadius: bodySize / 2,
                backgroundColor: c.sky,
                left: bodySize * 0.32,
                top: -bodySize * 0.08,
              }}
            />
          </View>
        </>
      ) : (
        <>
          <Animated.View style={[styles.rayGroup, { width: size, height: size }, rayStyle]}>
            {[0, 45, 90, 135].map((deg) => (
              <View
                key={deg}
                style={{
                  position: 'absolute',
                  width: 2.5,
                  height: size * 0.74,
                  left: size / 2 - 1.25,
                  top: size / 2 - (size * 0.74) / 2,
                  borderRadius: 2,
                  opacity: 0.85,
                  backgroundColor: c.ray,
                  transform: [{ rotate: `${deg}deg` }],
                }}
              />
            ))}
          </Animated.View>
          <View style={[styles.sun, { width: bodySize, height: bodySize, borderRadius: bodySize / 2, backgroundColor: c.body }]} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  skyBottom: {
    top: '55%',
    opacity: 0.5,
  },
  rayGroup: {
    position: 'absolute',
  },
  sun: {
    shadowColor: '#FFDA7A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  moon: {
    overflow: 'hidden',
  },
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  starSm: {
    position: 'absolute',
    width: 2.5,
    height: 2.5,
    borderRadius: 1.5,
  },
});
