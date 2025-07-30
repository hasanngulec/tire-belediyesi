// Supabase Bağlantı Testi
const { createClient } = require('@supabase/supabase-js');

// URL polyfill for Node.js
if (typeof global.URL === 'undefined') {
  global.URL = require('url').URL;
}

// Supabase configuration
const supabaseUrl = 'https://sfulbvzijpvrkbqzadtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdWxidnppanB2cmticXphZHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTYyMjEsImV4cCI6MjA2OTI3MjIyMX0.IYe5Hul_KD05o_E9ufrI9d-PT9UBBcOgifqAFJjZ8tg';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔗 Supabase Bağlantı Testi Başlatılıyor...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey.substring(0, 20) + '...');

async function testSupabaseConnection() {
  try {
    console.log('\n📡 Bağlantı test ediliyor...');
    
    // Test 1: Basit bağlantı testi
    const { data, error } = await supabase
      .from('gezi_noktalari')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Bağlantı hatası:', error.message);
      return false;
    }
    
    console.log('✅ Bağlantı başarılı!');
    console.log('📊 Veri örneği:', data);
    
    // Test 2: Tablo listesi kontrolü
    console.log('\n📋 Mevcut tablolar kontrol ediliyor...');
    
    const tables = ['gezi_noktalari', 'rotalar', 'influencerlar', 'etkinlikler'];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ ${table} tablosu erişilemiyor:`, error.message);
        } else {
          console.log(`✅ ${table} tablosu erişilebilir (${data.length} kayıt)`);
        }
      } catch (err) {
        console.log(`❌ ${table} tablosu hatası:`, err.message);
      }
    }
    
    return true;
    
  } catch (error) {
    console.log('❌ Genel bağlantı hatası:', error.message);
    return false;
  }
}

// Testi çalıştır
testSupabaseConnection().then(success => {
  console.log('\n🎯 Test Sonucu:', success ? 'BAŞARILI' : 'BAŞARISIZ');
  console.log('\n📝 Not: Bu test Node.js ortamında çalışır.');
  console.log('   Gerçek uygulama React Native/Expo ortamında çalışacaktır.');
}); 