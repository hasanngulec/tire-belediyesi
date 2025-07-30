-- Supabase'e Örnek Veriler Ekleme
-- Bu komutları Supabase SQL Editor'da çalıştırın

-- 1. Etkinlikler tablosuna veri ekle
INSERT INTO etkinlikler (ad, aciklama, tarih, adres, telefon_numarasi, enlem, boylam) VALUES
('Tire Kültür Festivali', 'Geleneksel el sanatları ve kültür etkinlikleri', '2024-06-15', 'Tire Eski Belediye Binası', '0232 123 45 67', 38.0897, 27.7358),
('Ramazan Etkinlikleri', 'İftar programları ve kültürel etkinlikler', '2024-04-20', 'Tire Merkez', '0232 123 45 68', 38.0895, 27.7355),
('Çevre Gününü Kutlama', 'Ağaç dikme ve çevre bilincini artırma etkinliği', '2024-06-05', 'Tire Millet Bahçesi', '0232 123 45 69', 38.0900, 27.7360);

-- 2. Gezi noktaları tablosuna veri ekle
INSERT INTO gezi_noktalari (ad, aciklama, kategori, enlem, boylam, acilis_saati, kapanis_saati, telefon_numarasi, adres) VALUES
('Tire Belediye Binası', 'Tarihi belediye binası ve şehir merkezi', 'Tarihi Yapı', 38.0897, 27.7358, '09:00', '17:00', '0232 123 45 67', 'Tire Merkez'),
('Tire Millet Bahçesi', 'Şehrin en büyük parkı ve rekreasyon alanı', 'Park', 38.0900, 27.7360, '06:00', '23:00', '0232 123 45 68', 'Tire Millet Bahçesi'),
('Tire El Sanatları Merkezi', 'Geleneksel el sanatları ve kültür merkezi', 'Kültür Merkezi', 38.0895, 27.7355, '10:00', '18:00', '0232 123 45 69', 'Tire El Sanatları Merkezi');

-- 3. Rotalar tablosuna veri ekle
INSERT INTO rotalar (aciklama, gezi_nok_id, kategori) VALUES
('Tire\'nin tarihi yerlerini keşfetmek için ideal rota', 1, 'Tarihi Tur'),
('El sanatları ve kültürel mekanları ziyaret etmek için özel rota', 3, 'Kültür Turu'),
('Tire\'nin doğal güzelliklerini keşfetmek için mükemmel rota', 2, 'Doğa Turu');

-- 4. Influencerlar tablosuna veri ekle
INSERT INTO influencerlar (ad, aciklama, instagram_linki, rota_id) VALUES
('Tire Gezgin', 'Tire\'nin gizli kalmış güzelliklerini keşfeden seyahat blogcusu', 'https://instagram.com/tiregezgin', 1),
('Kültür Avcısı', 'Geleneksel el sanatları ve kültür odaklı içerik üreticisi', 'https://instagram.com/kulturavcisi', 2),
('Doğa Rehberi', 'Doğa ve çevre odaklı içerik üreten influencer', 'https://instagram.com/dogarehberi', 3);

-- 5. Eklenen verileri kontrol et
SELECT 'etkinlikler' as tablo, COUNT(*) as kayit_sayisi FROM etkinlikler
UNION ALL
SELECT 'gezi_noktalari' as tablo, COUNT(*) as kayit_sayisi FROM gezi_noktalari
UNION ALL
SELECT 'rotalar' as tablo, COUNT(*) as kayit_sayisi FROM rotalar
UNION ALL
SELECT 'influencerlar' as tablo, COUNT(*) as kayit_sayisi FROM influencerlar; 