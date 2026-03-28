import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Furkan',
  slug: 'furkan',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  scheme: 'furkan',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#0d0d0f',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.furkan.app',
    infoPlist: {
      UIBackgroundModes: ['fetch'],
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#0d0d0f',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    package: 'com.furkan.app',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'react-native-android-widget',
      {
        widgets: [
          {
            name: 'FurkanVerse',
            label: 'Furkan — Günlük Ayet',
            description: 'Bugünün ayeti ve Türkçe meal',
            minWidth: '320dp',
            minHeight: '120dp',
            targetCellWidth: 5,
            targetCellHeight: 2,
            updatePeriodMillis: 1800000,
          },
        ],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
