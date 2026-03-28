import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function TabLayout() {
  const { palette } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: palette.card,
          borderTopColor: palette.soft,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: palette.accent,
        tabBarInactiveTintColor: palette.soft,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          title: 'Kuran',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📖</Text>,
        }}
      />
    </Tabs>
  );
}
