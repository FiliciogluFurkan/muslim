import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@mushaf/widget_payload_v1';

export type StoredWidgetPayload = {
  dateSeed: number;
  arabic: string;
  turkish: string;
  surahLabel: string;
  hadithText: string;
  hadithSource: string;
};

export async function persistWidgetPayload(payload: StoredWidgetPayload): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export async function loadWidgetPayload(): Promise<StoredWidgetPayload | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredWidgetPayload;
  } catch {
    return null;
  }
}
