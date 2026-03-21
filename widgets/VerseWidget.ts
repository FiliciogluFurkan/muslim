/**
 * SDK 54: `expo-widgets` yok — gerçek iOS widget’ı için projeyi SDK 55+’e yükselt.
 * Expo Go / ana uygulama bu no-op ile çalışır.
 */
export default {
  reload() {},
  updateTimeline() {},
  updateSnapshot() {},
  getTimeline() {
    return Promise.resolve([]);
  },
};
