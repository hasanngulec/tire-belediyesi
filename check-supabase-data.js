// Supabase Veri Kontrolü
const { createClient } = require('@supabase/supabase-js');

// URL polyfill for Node.js
if (typeof global.URL === 'undefined') {
  global.URL = require('url').URL;
}

// Supabase configuration
const supabaseUrl = 'https://sfulbvzijpvrkbqzadtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdWxidnppanB2cmticXphZHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTYyMjEsImV4cCI6MjA2OTI3MjIyMX0.IYe5Hul_KD05o_E9ufrI9d-PT9UBBcOgifqAFJjZ8tg';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Supabase Veri Kontrolü Başlatılıyor...');

async function checkSupabaseData() {
  try {
    // Tüm tabloları kontrol et
    const tables = [
      'gezi_noktalari',
      'rotalar', 
      'influencerlar',
      'etkinlikler',
      'events', // İngilizce tablo adı da olabilir
      'tourism_spots', // İngilizce tablo adı da olabilir
      'travel_routes', // İngilizce tablo adı da olabilir
      'emergency_contacts', // İngilizce tablo adı da olabilir
      'duty_pharmacies', // İngilizce tablo adı da olabilir
      'news', // İngilizce tablo adı da olabilir
      'mayor_messages', // İngilizce tablo adı da olabilir
      'contact_info' // İngilizce tablo adı da olabilir
    ];
    
    console.log('\n📋 Mevcut tablolar ve veriler kontrol ediliyor...');
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*');
        
        if (error) {
          console.log(`❌ ${table} tablosu erişilemiyor:`, error.message);
        } else {
          console.log(`✅ ${table} tablosu: ${data.length} kayıt bulundu`);
          if (data.length > 0) {
            console.log(`   İlk kayıt:`, JSON.stringify(data[0], null, 2));
          }
        }
      } catch (err) {
        console.log(`❌ ${table} tablosu hatası:`, err.message);
      }
    }
    
    // Tüm tabloları listele
    console.log('\n🔍 Tüm tablolar listeleniyor...');
    try {
      const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
      
      if (!error && data) {
        console.log('📋 Mevcut tablolar:');
        data.forEach(table => {
          console.log(`   - ${table.table_name}`);
        });
      }
    } catch (err) {
      console.log('❌ Tablo listesi alınamadı:', err.message);
    }
    
  } catch (error) {
    console.log('❌ Genel hata:', error.message);
  }
}

// Kontrolü çalıştır
checkSupabaseData(); 