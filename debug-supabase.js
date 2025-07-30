// Supabase Debug - Detaylı Veri Kontrolü
const { createClient } = require('@supabase/supabase-js');

// URL polyfill for Node.js
if (typeof global.URL === 'undefined') {
  global.URL = require('url').URL;
}

// Supabase configuration
const supabaseUrl = 'https://sfulbvzijpvrkbqzadtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdWxidnppanB2cmticXphZHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTYyMjEsImV4cCI6MjA2OTI3MjIyMX0.IYe5Hul_KD05o_E9ufrI9d-PT9UBBcOgifqAFJjZ8tg';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Supabase Debug Başlatılıyor...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey.substring(0, 20) + '...');

async function debugSupabase() {
  try {
    console.log('\n📡 Bağlantı test ediliyor...');
    
    // Test 1: Basit bağlantı testi
    const { data, error } = await supabase
      .from('gezi_noktalari')
      .select('*');
    
    console.log('Raw response:', { data, error });
    
    if (error) {
      console.log('❌ Bağlantı hatası:', error);
      return;
    }
    
    console.log('✅ Bağlantı başarılı!');
    console.log('📊 Veri sayısı:', data ? data.length : 'undefined');
    
    // Test 2: Farklı tabloları dene
    const tables = [
      'gezi_noktalari',
      'rotalar', 
      'influencerlar',
      'etkinlikler'
    ];
    
    console.log('\n📋 Tablo detayları:');
    
    for (const table of tables) {
      try {
        console.log(`\n🔍 ${table} tablosu kontrol ediliyor...`);
        
        // Önce tablo varlığını kontrol et
        const { data: tableCheck, error: tableError } = await supabase
          .from(table)
          .select('count')
          .limit(1);
        
        console.log(`${table} tablo kontrolü:`, { data: tableCheck, error: tableError });
        
        // Tüm verileri çek
        const { data: allData, error: allError } = await supabase
          .from(table)
          .select('*');
        
        console.log(`${table} tüm veriler:`, { 
          dataLength: allData ? allData.length : 'undefined',
          error: allError,
          firstRecord: allData && allData.length > 0 ? allData[0] : 'No data'
        });
        
        if (allError) {
          console.log(`❌ ${table} hatası:`, allError);
        } else {
          console.log(`✅ ${table}: ${allData ? allData.length : 0} kayıt`);
        }
        
      } catch (err) {
        console.log(`❌ ${table} genel hatası:`, err.message);
      }
    }
    
    // Test 3: RLS (Row Level Security) kontrolü
    console.log('\n🔒 RLS kontrolü...');
    try {
      const { data: rlsData, error: rlsError } = await supabase
        .from('gezi_noktalari')
        .select('*')
        .limit(1);
      
      console.log('RLS test sonucu:', { data: rlsData, error: rlsError });
    } catch (err) {
      console.log('RLS test hatası:', err.message);
    }
    
    // Test 4: Farklı API key ile dene
    console.log('\n🔑 API Key kontrolü...');
    console.log('Mevcut key türü:', supabaseKey.includes('anon') ? 'ANON' : 'SERVICE_ROLE');
    
  } catch (error) {
    console.log('❌ Genel debug hatası:', error.message);
  }
}

// Debug'ı çalıştır
debugSupabase(); 