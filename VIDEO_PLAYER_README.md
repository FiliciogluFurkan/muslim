# Video Player - Senkronizasyon Sistemi

## 📋 Genel Bakış

Bu sistem video + audio + text senkronizasyonu sağlar. TikTok/Reels tarzında arka planda video oynarken, sesli Kuran okuyuşu ve ayetlerin senkronize gösterimi.

## 🏗️ Mimari

```
┌─────────────────────────────────────────┐
│           Video Player Screen            │
│  ┌─────────────────────────────────┐    │
│  │     Video (Background)          │    │
│  │  ┌──────────────────────────┐   │    │
│  │  │   Ayet Metni (Overlay)   │   │    │
│  │  └──────────────────────────┘   │    │
│  └─────────────────────────────────┘    │
│         Audio (Sesli Okuyuş)            │
└─────────────────────────────────────────┘
```

## 📦 Veri Yapısı

### SurahVideoData Interface

```typescript
{
  surahNumber: 1,
  surahName: "Fatiha",
  audioUrl: "https://cdn.../fatiha.mp3",  // Tam sure audio
  videoUrl: "https://cdn.../bg.mp4",       // Arka plan video
  verses: [
    { text: "بِسْمِ...", start: 0, verseNumber: 1 },
    { text: "ٱلْحَمْدُ...", start: 4.0, verseNumber: 2 },
    // ...
  ]
}
```

## 🎯 Senkronizasyon Mantığı

1. **Audio zamanı takip edilir** (`positionMillis`)
2. **Her saniye kontrol edilir** hangi ayet aralığındayız
3. **Ayet değiştiğinde** ekrandaki text güncellenir
4. **Video loop'ta** sürekli oynar (muted)

```typescript
const verseIndex = verses.findIndex((v, i) => {
  return currentTime >= v.start && 
         (i === verses.length - 1 || currentTime < verses[i + 1].start);
});
```

## 📁 Dosya Yapısı

```
screens/video-player/
├── VideoPlayerScreen.tsx        # Ana component
└── VideoPlayerScreen.styles.ts  # Styles

lib/
└── videoSurahData.ts            # Veri yapısı ve test data

app/
└── video-player.tsx             # Route
```

## 🚀 Kullanım

Ana sayfadan "Video Player (Test)" butonuna tıklayın.

## ⏱️ Timing Oluşturma

### Manuel Yöntem (Önerilen)

1. Hoca okuyuşunu indir
2. Audacity gibi bir program aç
3. Her ayetin başladığı saniyeyi not et
4. JSON'a ekle

### Otomatik Yöntem (Gelecek)

```typescript
// Her ayet için sabit süre (başlangıç için)
const timing = createTimingTemplate(7, 4); // 7 ayet, 4sn ortalama
```

## 🎥 Video Kaynakları

- **Pexels**: https://www.pexels.com/videos/
- **Pixabay**: https://pixabay.com/videos/
- Arama: "nature background", "islamic pattern", "slow motion"

## 🔊 Audio Kaynakları

- **Islamic Network API**: https://api.alquran.cloud/
- Örnek: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3`

## 📱 Özellikler

✅ Video + Audio + Text senkronizasyonu
✅ Play/Pause kontrol
✅ Otomatik ayet değişimi
✅ Tam ekran deneyim
✅ Loop video

## 🔮 Gelecek Geliştirmeler

- [ ] Swipe ile sure değiştirme
- [ ] Farklı hocalar seçimi
- [ ] Favori ayetler
- [ ] Paylaşma özelliği
- [ ] Offline mod
- [ ] Progress bar
- [ ] Ayet atlama
- [ ] Hız kontrolü

## 🛠️ Backend Entegrasyonu

```typescript
// API endpoint örneği
GET /api/surah/{surahNumber}/video

Response:
{
  "surahNumber": 1,
  "surahName": "Fatiha",
  "audioUrl": "https://...",
  "videoUrl": "https://...",
  "verses": [...]
}
```

## 💾 Storage Yapısı

```
AWS S3 / Firebase Storage
├── audio/
│   ├── 1.mp3  (Fatiha)
│   ├── 2.mp3  (Bakara)
│   └── ...
├── videos/
│   ├── bg1.mp4
│   ├── bg2.mp4
│   └── ...
└── metadata/
    └── surah_timings.json
```

## 🎨 Tasarım Notları

- Video: Tam ekran, muted, loop
- Overlay: Yarı saydam siyah (0.4 opacity)
- Text: Beyaz, gölgeli, ortalanmış
- Font: Amiri Bold (Arapça için)
- Animasyon: Fade in/out ayet değişiminde (opsiyonel)

## 🐛 Bilinen Sorunlar

- iOS'ta video ilk yüklemede gecikebilir
- Android'de audio sync hafif kayabilir
- Büyük video dosyaları yavaş yüklenebilir

## 💡 İpuçları

1. Video dosyaları 5-10 MB altında tutun
2. Audio kalitesi 128kbps yeterli
3. Timing'leri 0.1 saniye hassasiyetle ayarlayın
4. Test için kısa surelerle başlayın (Fatiha, İhlas)
