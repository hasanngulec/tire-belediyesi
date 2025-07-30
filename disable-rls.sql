-- RLS'yi Tamamen Devre Dışı Bırakma
-- Bu komutları Supabase SQL Editor'da çalıştırın

-- Tüm tablolar için RLS'yi devre dışı bırak
ALTER TABLE gezi_noktalari DISABLE ROW LEVEL SECURITY;
ALTER TABLE rotalar DISABLE ROW LEVEL SECURITY;
ALTER TABLE influencerlar DISABLE ROW LEVEL SECURITY;
ALTER TABLE etkinlikler DISABLE ROW LEVEL SECURITY;

-- Mevcut politikaları sil (eğer varsa)
DROP POLICY IF EXISTS "Anonim kullanıcılar gezi noktalarını okuyabilir" ON gezi_noktalari;
DROP POLICY IF EXISTS "Anonim kullanıcılar rotaları okuyabilir" ON rotalar;
DROP POLICY IF EXISTS "Anonim kullanıcılar influencerları okuyabilir" ON influencerlar;
DROP POLICY IF EXISTS "Anonim kullanıcılar etkinlikleri okuyabilir" ON etkinlikler;

-- Kontrol et
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('gezi_noktalari', 'rotalar', 'influencerlar', 'etkinlikler'); 