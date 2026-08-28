import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { TAB_BAR_HEIGHT } from '../../lib/layout';
import { FONT } from '../../lib/typography';

// Home ikonu — minimal çizgi ev
function HomeIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        strokeLinejoin="round"
        fill={focused ? color : 'none'}
        fillOpacity={focused ? 0.16 : 0}
      />
    </Svg>
  );
}

// Vakitler ikonu — saat
function PrayerTimesIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={8}
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        fill={focused ? color : 'none'}
        fillOpacity={focused ? 0.12 : 0}
      />
      <Path
        d="M12 8V12L15 15"
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Kuran ikonu — açık kitap
function QuranIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6C10 4 7 4 5 5V19C7 18 10 18 12 20C14 18 17 18 19 19V5C17 4 14 4 12 6Z"
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        strokeLinejoin="round"
        fill={focused ? color : 'none'}
        fillOpacity={focused ? 0.12 : 0}
      />
      <Path d="M12 6V20" stroke={color} strokeWidth={focused ? 2 : 1.6} strokeLinecap="round" />
    </Svg>
  );
}

// Dualar ikonu — el açık dua
function DualarIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3C12 3 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 3 12 3Z"
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        strokeLinejoin="round"
        fill={focused ? color : 'none'}
        fillOpacity={focused ? 0.15 : 0}
      />
      <Path
        d="M6 14C6 14 4 15 4 17C4 19 5.8 20 8 20H16C18.2 20 20 19 20 17C20 15 18 14 18 14"
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}
function TabIcon({
  focused,
  accent,
  children,
}: {
  focused: boolean;
  accent: string;
  children: React.ReactNode;
}) {
  const p = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    p.value = withSpring(focused ? 1 : 0, { damping: 14, stiffness: 220, mass: 0.6 });
  }, [focused]);

  const pillStyle = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ scaleX: interpolate(p.value, [0, 1], [0.5, 1]) }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(p.value, [0, 1], [0, -1]) },
      { scale: interpolate(p.value, [0, 1], [1, 1.1]) },
    ],
  }));

  return (
    <View style={styles.iconWrapper}>
      <Animated.View
        style={[styles.pill, { backgroundColor: `${accent}22` }, pillStyle]}
        pointerEvents="none"
      />
      <Animated.View style={iconStyle}>{children}</Animated.View>
    </View>
  );
}

// Namaz Takip ikonu — takvim + check
function NamazTakipIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 2V5M16 2V5M3 9H21M4 4H20C20.55 4 21 4.45 21 5V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V5C3 4.45 3.45 4 4 4Z"
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={focused ? color : 'none'}
        fillOpacity={focused ? 0.1 : 0}
      />
      <Path
        d="M8 13L11 16L16 11"
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function TabLayout() {
  const { palette } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: palette.card,
          borderTopWidth: 0,
          // Android sistem navigasyonu için güvenli alan payı
          height: TAB_BAR_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 12,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
          shadowColor: '#0C1F17',
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
        },
        tabBarActiveTintColor: palette.accent,
        tabBarInactiveTintColor: palette.muted,
        tabBarLabelStyle: {
          fontFamily: FONT.semibold,
          fontSize: 11,
          letterSpacing: 0.3,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} accent={palette.accent}>
              <HomeIcon color={color} focused={focused} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="prayer-times"
        options={{
          title: 'Vakitler',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} accent={palette.accent}>
              <PrayerTimesIcon color={color} focused={focused} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="dualar"
        options={{
          title: 'Dualar',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} accent={palette.accent}>
              <DualarIcon color={color} focused={focused} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="namaz-takip"
        options={{
          title: 'Takip',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} accent={palette.accent}>
              <NamazTakipIcon color={color} focused={focused} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          title: 'Kuran',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} accent={palette.accent}>
              <QuranIcon color={color} focused={focused} />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 34,
  },
  pill: {
    position: 'absolute',
    width: 52,
    height: 32,
    borderRadius: 16,
  },
});
