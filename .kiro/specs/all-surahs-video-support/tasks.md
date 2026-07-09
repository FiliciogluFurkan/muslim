# Implementation Plan

## Overview
Tüm 114 sure için video oynatıcı desteği eklenecek. Mevcut Fatiha implementasyonu diğer surelere genişletilecek.

## Tasks

- [ ] 1. Video player için dynamic route ekle
  - app/video-player/[id].tsx dosyası oluştur
  - Route parametresinden sure numarasını al
  - VideoPlayerScreen'e prop olarak geçir
  - _Requirements: 1.1, 3.1, 3.4_

- [ ] 2. VideoPlayerScreen'i sure parametresi kabul edecek şekilde güncelle
  - Props interface ekle (surahNumber?: number)
  - Parametre validation ekle (1-114 range)
  - getSurahData'yı parametre ile çağır
  - testSurahData yerine dynamic data kullan
  - _Requirements: 1.2, 3.2, 3.5_

- [ ] 3. Sure listesini tüm sureler için video destekli yap
  - SURAHS_WITH_VIDEO array'ini 1-114 ile doldur
  - handleSurahPress'i dynamic route ile güncelle
  - Video rozeti tüm surelerde görünsün
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 4. videoSurahData.ts'e tüm surelerin verilerini ekle
  - AUDIO record'unu 114 sure için doldur
  - TIMINGS record'unu 114 sure için doldur  
  - VERSE_TEXTS record'unu 114 sure için doldur
  - SURAH_META record'unu 114 sure için doldur
  - getSurahData validation ekle
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 5. Test ve doğrulama
  - Birkaç farklı sure ile test et
  - Navigation flow'u test et
  - Hata durumlarını test et
  - _Requirements: All_
