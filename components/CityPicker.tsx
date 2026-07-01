import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CITIES } from '../lib/cities';
import { useMushafStore } from '../lib/store';
import { useTheme } from '../hooks/useTheme';
import { FONT } from '../lib/typography';
import { PressableScale } from './PressableScale';

type Props = {
  visible: boolean;
  onClose: () => void;
  /** "Otomatik (Konum)" seçilince — genelde GPS izni istemek için. */
  onAuto?: () => void;
};

export function CityPicker({ visible, onClose, onAuto }: Props) {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const manualLocation = useMushafStore((s) => s.manualLocation);
  const setManualLocation = useMushafStore((s) => s.setManualLocation);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    if (!q) return CITIES;
    return CITIES.filter((c) => c.city.toLocaleLowerCase('tr').includes(q));
  }, [query]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            { backgroundColor: palette.bg, paddingBottom: insets.bottom + 12 },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.grabber}>
            <View style={[styles.grabberBar, { backgroundColor: palette.soft }]} />
          </View>

          <View style={styles.header}>
            <Text style={[styles.title, { color: palette.fg }]}>Şehir Seç</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={[styles.close, { color: palette.muted }]}>✕</Text>
            </Pressable>
          </View>

          <View style={[styles.searchWrap, { backgroundColor: palette.input }]}>
            <Text style={[styles.searchIcon, { color: palette.muted }]}>⌕</Text>
            <TextInput
              style={[styles.search, { color: palette.fg }]}
              placeholder="Şehir ara..."
              placeholderTextColor={palette.soft}
              value={query}
              onChangeText={setQuery}
            />
          </View>

          {/* Otomatik (GPS) seçeneği */}
          <PressableScale
            onPress={() => {
              setManualLocation(null);
              onClose();
              onAuto?.();
            }}
            style={[
              styles.autoRow,
              {
                backgroundColor: manualLocation === null ? palette.accentSoft : palette.card,
                borderColor: manualLocation === null ? palette.accent : palette.border,
              },
            ]}
          >
            <Text style={[styles.autoIcon, { color: palette.accent }]}>◎</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.autoTitle, { color: palette.fg }]}>Otomatik (Konum)</Text>
              <Text style={[styles.autoDesc, { color: palette.muted }]}>
                GPS ile bulunduğun yer
              </Text>
            </View>
            {manualLocation === null && (
              <Text style={[styles.check, { color: palette.accent }]}>✓</Text>
            )}
          </PressableScale>

          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {filtered.map((c) => {
              const active = manualLocation?.city === c.city;
              return (
                <PressableScale
                  key={c.city}
                  onPress={() => {
                    setManualLocation(c);
                    onClose();
                  }}
                  style={[styles.cityRow, { borderBottomColor: palette.soft }]}
                >
                  <Text style={[styles.cityName, { color: active ? palette.accent : palette.fg }]}>
                    {c.city}
                  </Text>
                  {active && <Text style={[styles.check, { color: palette.accent }]}>✓</Text>}
                </PressableScale>
              );
            })}
            <View style={{ height: 8 }} />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '78%',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  grabber: { alignItems: 'center', paddingVertical: 8 },
  grabberBar: { width: 40, height: 5, borderRadius: 3 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: { fontFamily: FONT.extrabold, fontSize: 22, letterSpacing: -0.4 },
  close: { fontSize: 18, fontWeight: '700' },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  searchIcon: { fontSize: 20, marginRight: 8, fontWeight: '700' },
  search: { flex: 1, fontFamily: FONT.medium, paddingVertical: 12, fontSize: 15 },
  autoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  autoIcon: { fontSize: 22 },
  autoTitle: { fontFamily: FONT.bold, fontSize: 15 },
  autoDesc: { fontFamily: FONT.medium, fontSize: 12, marginTop: 2 },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cityName: { fontFamily: FONT.semibold, fontSize: 16 },
  check: { fontSize: 16, fontWeight: '700' },
});
