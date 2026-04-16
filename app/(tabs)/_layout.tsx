import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';

// Home ikonu — minimal çizgi ev
function HomeIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
        stroke={color}
        strokeWidth={focused ? 2 : 1.5}
        strokeLinejoin="round"
        fill={focused ? color : 'none'}
        fillOpacity={focused ? 0.15 : 0}
      />
    </Svg>
  );
}

// Vakitler ikonu — saat / zaman
function PrayerTimesIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={8}
        stroke={color}
        strokeWidth={focused ? 2 : 1.5}
        fill={focused ? color : 'none'}
        fillOpacity={focused ? 0.12 : 0}
      />
      <Path
        d="M12 8V12L15 15"
        stroke={color}
        strokeWidth={focused ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Kuran ikonu — kitap / açık sayfa
function QuranIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6C10 4 7 4 5 5V19C7 18 10 18 12 20C14 18 17 18 19 19V5C17 4 14 4 12 6Z"
        stroke={color}
        strokeWidth={focused ? 2 : 1.5}
        strokeLinejoin="round"
        fill={focused ? color : 'none'}
        fillOpacity={focused ? 0.12 : 0}
      />
      <Path
        d="M12 6V20"
        stroke={color}
        strokeWidth={focused ? 2 : 1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Aktif nokta göstergesi
function ActiveDot({ color }: { color: string }) {
  return (
    <View style={[styles.activeDot, { backgroundColor: color }]} />
  );
}

export default function TabLayout() {
  const { palette } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: palette.card,
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 80 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
          // İnce üst çizgi yerine hafif gölge
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
        },
        tabBarActiveTintColor: palette.accent,
        tabBarInactiveTintColor: palette.soft,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: 0.3,
          marginTop: 2,
        },
        tabBarItemStyle: {
          gap: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <HomeIcon color={color} focused={focused} />
              {focused && <ActiveDot color={palette.accent} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="prayer-times"
        options={{
          title: 'Vakitler',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <PrayerTimesIcon color={color} focused={focused} />
              {focused && <ActiveDot color={palette.accent} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          title: 'Kuran',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <QuranIcon color={color} focused={focused} />
              {focused && <ActiveDot color={palette.accent} />}
            </View>
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
    gap: 3,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});