import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useTheme } from '../../hooks/useTheme';
import { PressableScale } from '../../components/PressableScale';
import { tabScrollPadding } from '../../lib/layout';
import { FONT } from '../../lib/typography';
import { getAll, getDualar, getHikayeler, type Dua } from '../../lib/dualarData';
import { styles } from './DualarScreen.styles';

type FilterType = 'tumu' | 'dua' | 'hikaye';

function DuaCard({ item, index, accent }: { item: Dua; index: number; accent: string }) {
  const { palette } = useTheme();
  const isDua = item.category === 'dua';
  const color = isDua ? palette.accent : palette.gold;
  const colorSoft = isDua ? palette.accentSoft : palette.goldSoft;

  return (
    <Animated.View entering={FadeInDown.duration(360).delay(Math.min(index, 8) * 50)}>
      <PressableScale
        style={[styles.card, styles.cardShadow, { backgroundColor: palette.card, borderColor: palette.border }]}
        onPress={() => router.push({ pathname: '/dualar/[id]', params: { id: item.id } })}
      >
        {/* Üst: tag + ok */}
        <View style={styles.cardHeader}>
          <View style={{ flex: 1, gap: 6 }}>
            <View style={[styles.tagPill, { backgroundColor: colorSoft }]}>
              <Text style={[styles.tagText, { color }]}>{item.tag}</Text>
            </View>
            <Text style={[styles.cardTitle, { color: palette.fg }]}>{item.title}</Text>
            <Text style={[styles.cardSubtitle, { color: palette.muted }]}>{item.subtitle}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 8, paddingTop: 2 }}>
            <View style={[styles.tagPill, { backgroundColor: palette.input }]}>
              <Text style={[styles.tagText, { color: palette.muted }]}>
                {isDua ? '🤲 Dua' : '📖 Hikaye'}
              </Text>
            </View>
          </View>
        </View>

        {/* Preview - ilk paragrafın başlangıcı */}
        <Text
          style={[styles.cardSubtitle, { color: palette.muted, lineHeight: 21 }]}
          numberOfLines={2}
        >
          {item.paragraphs[0]}
        </Text>

        {/* Alt: kaynak + okuma süresi */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={[styles.readTime, { color: palette.soft }]}>{item.source}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="time-outline" size={12} color={palette.soft} />
            <Text style={[styles.readTime, { color: palette.soft }]}>{item.readTime} dk</Text>
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
}

export default function DualarScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();
  const [filter, setFilter] = useState<FilterType>('tumu');

  const data = filter === 'tumu' ? getAll() : filter === 'dua' ? getDualar() : getHikayeler();

  const filters: { key: FilterType; label: string }[] = [
    { key: 'tumu', label: 'Tümü' },
    { key: 'dua', label: '🤲 Dualar' },
    { key: 'hikaye', label: '📖 Hikayeler' },
  ];

  return (
    <View style={[styles.root, { backgroundColor: palette.bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 16, paddingBottom: tabScrollPadding(insets.bottom) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <Text style={[styles.eyebrow, { color: palette.accent }]}>Furkan</Text>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: palette.fg }]}>Dualar & Hikayeler</Text>
          </View>

          {/* Filter tabs */}
          <View style={styles.filterRow}>
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <PressableScale
                  key={f.key}
                  style={[
                    styles.filterTab,
                    {
                      backgroundColor: active ? palette.accent : palette.card,
                      borderColor: active ? palette.accent : palette.border,
                    },
                  ]}
                  onPress={() => setFilter(f.key)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      { color: active ? '#FFFFFF' : palette.muted },
                    ]}
                  >
                    {f.label}
                  </Text>
                </PressableScale>
              );
            })}
          </View>
        </Animated.View>

        {/* Dualar section */}
        {(filter === 'tumu' || filter === 'dua') && (
          <>
            {filter === 'tumu' && (
              <Text style={[styles.sectionLabel, { color: palette.muted }]}>Peygamber Duaları</Text>
            )}
            {data.filter(d => d.category === 'dua').map((item, i) => (
              <View key={item.id} style={{ marginBottom: 12 }}>
                <DuaCard item={item} index={i} accent={palette.accent} />
              </View>
            ))}
          </>
        )}

        {/* Hikayeler section */}
        {(filter === 'tumu' || filter === 'hikaye') && (
          <>
            {filter === 'tumu' && (
              <Text style={[styles.sectionLabel, { color: palette.muted, marginTop: 20 }]}>
                Dini Hikayeler
              </Text>
            )}
            {data.filter(d => d.category === 'hikaye').map((item, i) => (
              <View key={item.id} style={{ marginBottom: 12 }}>
                <DuaCard item={item} index={i} accent={palette.accent} />
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
