import { useEffect, useRef } from 'react';
import { View, ImageBackground, Animated } from 'react-native';
import { router } from 'expo-router';
import { styles } from './SplashScreen.styles';

export default function SplashScreen() {
  const ringAnim  = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.82)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Halka: fade + scale
    Animated.parallel([
      Animated.timing(ringAnim, {
        toValue: 1, duration: 900, delay: 200, useNativeDriver: true,
      }),
      Animated.spring(ringScale, {
        toValue: 1, friction: 7, tension: 60, delay: 200, useNativeDriver: true,
      }),
    ]).start();

    // Yazı: fade + yukarı kayma
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 900, delay: 650, useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 900, delay: 650, useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => router.replace('/(tabs)'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/mushaf.jpeg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.glowRing,
            { opacity: ringAnim, transform: [{ scale: ringScale }] },
          ]}
        >
          <Animated.Text
            style={[
              styles.arabicText,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            فُرقان
          </Animated.Text>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}