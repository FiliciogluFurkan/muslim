# Requirements Document

## Introduction

Bu özellik, Furkan uygulamasında mevcut video oynatıcı sistemini tüm 114 sure için genişletmeyi hedeflemektedir. Şu anda sadece Fatiha Suresi için video desteği bulunmakta, bu özellik ile kullanıcılar tüm sureleri Fatiha gibi video eşliğinde okuyup dinleyebileceklerdir.

## Glossary

- **Surah**: Kur'an'ın bölümlerinden biri (toplam 114 sure)
- **Verse/Ayet**: Sure içindeki her bir ayet
- **Timing Data**: Her ayetin audio'da kaç saniyede başladığını gösteren zaman bilgisi
- **Audio Asset**: Sure tilavetiini içeren MP3 dosyası
- **Video Player**: Arka plan videoları ile eşzamanlı Kur'an okuma ve dinleme ekranı
- **Surah Parameter**: Video oynatıcıya hangi surenin açılacağını belirten parametre

## Requirements

### Requirement 1

**User Story:** Bir kullanıcı olarak, 114 surenin tamamını video oynatıcıda izleyip dinlemek istiyorum, böylece tüm Kur'an'ı Fatiha'daki gibi görsel bir deneyimle okuyabilirim.

#### Acceptance Criteria

1. WHEN bir kullanıcı sure listesinden herhangi bir sureyi seçer THEN sistem o sureyi video oynatıcıda açmalıdır
2. WHEN video oynatıcı açılır THEN sistem seçilen surenin verilerini (audio, timing, metin) yüklemelidir
3. WHEN video oynatıcı başlatılır THEN sistem Fatiha'daki gibi çalışmalıdır
4. WHEN sure numarası 1-114 arasında ise THEN sistem o sureyi doğru şekilde açmalıdır
5. WHEN geçersiz bir sure numarası verilirse THEN sistem varsayılan olarak Fatiha'yı açmalıdır

### Requirement 2

**User Story:** Bir kullanıcı olarak, sure listesinde tüm surelerin video destekli olduğunu görmek istiyorum, böylece hangi sureleri video ile izleyebileceğimi bilebilirim.

#### Acceptance Criteria

1. WHEN sure listesi görüntülenir THEN tüm 114 sure için video rozeti gösterilmelidir
2. WHEN bir sure kartına tıklanır THEN o sure video oynatıcıda açılmalıdır
3. WHEN kullanıcı video destekli bir sureyi seçer THEN sistem doğrudan video oynatıcıya yönlendirmelidir
4. WHEN sure listesinde SURAHS_WITH_VIDEO değişkeni kontrol edilir THEN tüm sure numaralarını içermelidir
5. WHEN video rozeti gösterilir THEN tüm surelerde görünür olmalıdır

### Requirement 3

**User Story:** Bir geliştirici olarak, video oynatıcının hangi sureyi açacağını parametre ile belirlemek istiyorum, böylece sure listesinden seçilen sure doğru şekilde açılsın.

#### Acceptance Criteria

1. WHEN video oynatıcı route parametresi ile açılır THEN sistem parametre olarak geçilen sure numarasını okumalıdır
2. WHEN geçerli bir sure numarası (1-114) verilir THEN sistem o surenin verilerini yüklemelidir
3. WHEN sure numarası verilmez THEN sistem varsayılan olarak Fatiha'yı (1) açmalıdır
4. WHEN sure listesinden bir sure seçilir THEN sistem route parametresi ile sure numarasını video player'a göndermelidir
5. WHEN video oynatıcı sure parametresini okur THEN getSurahData fonksiyonuna doğru sure numarasını göndermelidir

### Requirement 4

**User Story:** Bir geliştirici olarak, tüm surelerin verilerinin (audio, timing, metin) sisteme eklenmiş olmasını istiyorum, böylece her sure Fatiha gibi çalışabilsin.

#### Acceptance Criteria

1. WHEN videoSurahData.ts dosyası kontrol edilir THEN 114 surenin audio kaynaklarını içermelidir
2. WHEN videoSurahData.ts dosyası kontrol edilir THEN 114 surenin timing verilerini içermelidir
3. WHEN videoSurahData.ts dosyası kontrol edilir THEN 114 surenin ayet metinlerini ve meallerini içermelidir
4. WHEN videoSurahData.ts dosyası kontrol edilir THEN 114 surenin meta bilgilerini (isim, Arapça isim) içermelidir
5. WHEN getSurahData fonksiyonu çağrılır THEN verilen sure numarasına göre doğru SurahVideoData döndürmelidir
