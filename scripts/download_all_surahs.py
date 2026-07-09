#!/usr/bin/env python3
"""
Tüm 114 surenin MP3'lerini ve timing JSON'larını indiren basit script
Kaynak: Everyayah API
"""

import os
import json
import urllib.request
from pathlib import Path

# ─── Ayarlar ────────────────────────────────────────────────────────────
# Everyayah'tan tam sure MP3'leri için muhtelif kaynaklar:
# 1. Yasser Ad-Dussary - Ayet ayet indirip birleştirmek gerekiyor
# 2. Alternatif: https://download.quranicaudio.com/ - Tam sureler

# Basit çözüm: Al-Quran Cloud API kullan
# https://api.alquran.cloud/v1/surah/{number}/ar.alafasy
# Bu API hem audio hem de timing veriyor

OUT_AUDIO = Path("assets/audio")
OUT_TIMING = Path("assets/timings")

# Sure başına ayet sayıları
SURAH_VERSE_COUNTS = [
    7,286,200,176,120,165,206,75,129,109,
    123,111,43,52,99,128,111,110,98,135,
    112,78,118,64,77,227,93,88,69,60,
    34,30,73,54,45,83,182,88,75,85,
    54,53,89,59,37,35,38,29,18,45,
    60,49,62,55,78,96,29,22,24,13,
    14,11,11,18,12,12,30,52,52,44,
    28,28,20,56,40,31,50,40,46,42,
    29,19,36,25,22,17,19,26,30,20,
    15,21,11,8,8,19,5,8,8,11,
    11,8,3,9,5,4,7,3,6,3,
    5,4,5,4,4,10,4,7,
]

def download_surah_mp3(surah_num: int) -> bool:
    """
    Sure MP3'ünü quranicaudio.com'dan indir
    """
    surah_str = str(surah_num).zfill(3)
    output_file = OUT_AUDIO / f"{surah_str}.mp3"
    
    if output_file.exists():
        print(f"  ✓ {surah_str}.mp3 zaten mevcut")
        return True
    
    # Quranicaudio.com - Mishary Rashid Alafasy
    # Format: https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/{surah_num}.mp3
    url = f"https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/{surah_num}.mp3"
    
    try:
        print(f"  ⬇ {surah_str}.mp3", end=" ", flush=True)
        urllib.request.urlretrieve(url, output_file)
        print(f"✅")
        return True
    except Exception as e:
        print(f"❌ Hata: {e}")
        return False

def generate_basic_timing(surah_num: int, verse_count: int) -> dict:
    """
    Basit bir timing JSON oluştur (her ayet ~3 saniye varsayımı)
    Gerçek timing için Everyayah API'den ayet ayet indirmek gerekir
    """
    surah_str = str(surah_num).zfill(3)
    output_file = OUT_TIMING / f"{surah_str}.json"
    
    if output_file.exists():
        print(f"  ✓ {surah_str}.json zaten mevcut")
        with open(output_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    # Basit timing - her ayet yaklaşık 3-5 saniye (gerçekte ayet uzunluğuna göre değişir)
    # Bu sadece placeholder, gerçek timing için Everyayah'tan word-by-word timing gerekir
    timings = []
    cursor = 0.0
    
    for verse_num in range(1, verse_count + 1):
        # Basit bir algoritma: ayet numarasına göre süre tahmini
        estimated_duration = 3.0 + (verse_num % 5) * 0.5  # 3-5.5 saniye arası
        
        timings.append({
            "verseNumber": verse_num,
            "start": round(cursor, 3),
            "duration": round(estimated_duration, 3),
        })
        cursor += estimated_duration
    
    timing_data = {
        "surahNumber": surah_num,
        "totalDuration": round(cursor, 3),
        "timings": timings,
        "note": "Basic estimated timing - replace with actual timing data"
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(timing_data, f, ensure_ascii=False, indent=2)
    
    print(f"  ✅ {surah_str}.json oluşturuldu (tahmini timing)")
    return timing_data

def main():
    OUT_AUDIO.mkdir(parents=True, exist_ok=True)
    OUT_TIMING.mkdir(parents=True, exist_ok=True)
    
    print("🎵 114 surenin MP3'leri indiriliyor...\n")
    
    success_count = 0
    failed = []
    
    for surah_num in range(1, 115):
        verse_count = SURAH_VERSE_COUNTS[surah_num - 1]
        print(f"\n📖 Sure {surah_num} ({verse_count} ayet)")
        
        # MP3 indir
        if download_surah_mp3(surah_num):
            success_count += 1
            # Basit timing oluştur
            generate_basic_timing(surah_num, verse_count)
        else:
            failed.append(surah_num)
    
    # Özet
    print(f"\n{'='*60}")
    print(f"✅ {success_count}/114 sure başarıyla indirildi")
    print(f"📁 Audio: {OUT_AUDIO.absolute()}")
    print(f"📁 Timing: {OUT_TIMING.absolute()}")
    
    if failed:
        print(f"\n❌ İndirilemeyenler: {failed}")
    
    print(f"\n⚠️  Not: Timing dosyaları tahmini değerlerdir.")
    print(f"    Gerçek word-by-word timing için Everyayah API'den")
    print(f"    ayet ayet indirip FFmpeg ile birleştirmek gerekir.")

if __name__ == "__main__":
    main()
