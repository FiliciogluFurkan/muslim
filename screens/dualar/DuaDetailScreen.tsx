import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useTheme } from '../../hooks/useTheme';
import { PressableScale } from '../../components/PressableScale';
import { DUAS } from '../../lib/dualarData';
import { styles } from './DualarScreen.styles';

export default function DuaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();

  const item = DUAS.find(d => d.id === id);

  if (!item) {
    return (
      <View style={[styles.root, { backgroundColor: palette.bg, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: palette.muted }}>İçerik bulunamadı.</Text>
      </View>
    );
  }

  const isDua = item.category === 'dua';
  const accentColor = isDua ? palette.accent : palette.gold;
  const accentSoft = isDua ? palette.accentSoft : palette.goldSoft;

  return (
    <View style={[styles.root, { backgroundColor: palette.bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={[
          styles.detailScroll,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 48 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Geri butonu */}
        <Animated.View entering={FadeInDown.duration(300)}>
          <PressableScale
            style={[styles.backBtn, { backgroundColor: palette.card, borderColor: palette.border }]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color={palette.fg} />
          </PressableScale>
        </Animated.View>

        {/* Header */}
        <Animated.View entering={FadeInDown.duration(380).delay(60)} style={[styles.detailHeader, { marginTop: 20 }]}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={[styles.detailTag, { backgroundColor: accentSoft }]}>
              <Text style={[styles.detailTagText, { color: accentColor }]}>{item.tag}</Text>
            </View>
            <View style={[styles.detailTag, { backgroundColor: palette.input }]}>
              <Text style={[styles.detailTagText, { color: palette.muted }]}>
                {isDua ? '🤲 Dua' : '📖 Hikaye'}
              </Text>
            </View>
          </View>

          <Text style={[styles.detailTitle, { color: palette.fg }]}>{item.title}</Text>
          <Text style={[styles.detailSubtitle, { color: palette.muted }]}>{item.subtitle}</Text>

          {/* Okuma süresi */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons name="time-outline" size={13} color={palette.soft} />
            <Text style={[styles.readTime, { color: palette.soft }]}>{item.readTime} dakika okuma</Text>
          </View>
        </Animated.View>

        {/* Arapça metin - sadece dualarda */}
        {item.arabicText && (
          <Animated.View entering={FadeInDown.duration(400).delay(120)}>
            <View style={[styles.arabicBox, { backgroundColor: accentSoft }]}>
              <Text style={[styles.arabicText, { color: palette.fg }]}>{item.arabicText}</Text>
              {item.transliteration && (
                <Text style={[styles.transliteration, { color: palette.muted }]}>
                  {item.transliteration}
                </Text>
              )}
            </View>
          </Animated.View>
        )}

        {/* Paragraflar */}
        <Animated.View entering={FadeInDown.duration(420).delay(160)} style={{ marginTop: 24 }}>
          {item.paragraphs.map((para, i) => (
            <Text
              key={i}
              style={[
                i === 0 ? styles.paragraphFirst : styles.paragraph,
                { color: i === 0 ? palette.fg : palette.muted },
              ]}
            >
              {para}
            </Text>
          ))}
        </Animated.View>

        {/* Kaynak */}
        <Animated.View entering={FadeInDown.duration(440).delay(200)}>
          <View style={styles.sourceRow}>
            <View style={[styles.sourceLine, { backgroundColor: palette.border }]} />
            <Text style={[styles.sourceText, { color: palette.soft }]}>{item.source}</Text>
            <View style={[styles.sourceLine, { backgroundColor: palette.border }]} />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
