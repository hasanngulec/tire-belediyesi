const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://sfulbvzijpvrkbqzadtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdWxidnppanB2cmticXphZHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTYyMjEsImV4cCI6MjA2OTI3MjIyMX0.IYe5Hul_KD05o_E9ufrI9d-PT9UBBcOgifqAFJjZ8tg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('🔍 Supabase veritabanındaki tablolar kontrol ediliyor...\n');
  
  // Test edilecek tablo isimleri - daha kapsamlı liste
  const possibleTables = [
    // İngilizce isimler
    'events',
    'tourism_spots', 
    'travel_routes',
    'emergency_contacts',
    'duty_pharmacies',
    'news',
    'contact_info',
    'mayor_messages',
    'rotalar',
    'noktalar',
    'etkinlik',
    'turizm',
    'gezi',
    'acil',
    'eczane',
    'haber',
    'iletisim',
    'baskan',
    'mesaj',
    
    // Türkçe isimler
    'etkinlikler',
    'turizm_noktalari',
    'gezi_rotalari',
    'acil_durumlar',
    'nobetci_eczaneler',
    'haberler',
    'iletisim_bilgileri',
    'baskan_mesajlari',
    'rotalar',
    'noktalar',
    'etkinlik',
    'turizm',
    'gezi',
    'acil',
    'eczane',
    'haber',
    'iletisim',
    'baskan',
    'mesaj',
    
    // Tekil isimler
    'event',
    'tourism_spot',
    'travel_route',
    'emergency_contact',
    'duty_pharmacy',
    'contact',
    'mayor_message',
    'rota',
    'nokta',
    'etkinlik',
    'turizm',
    'gezi',
    'acil',
    'eczane',
    'haber',
    'iletisim',
    'baskan',
    'mesaj'
  ];

  const existingTables = [];

  for (const tableName of possibleTables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
      
      if (!error) {
        console.log(`✅ Tablo bulundu: ${tableName}`);
        existingTables.push(tableName);
        
        // Tablo yapısını kontrol et
        if (data && data.length > 0) {
          console.log(`   📋 Sütunlar: ${Object.keys(data[0]).join(', ')}`);
        } else {
          console.log(`   📋 Tablo boş (sütun yapısı bilinmiyor)`);
        }
      } else {
        console.log(`❌ Tablo bulunamadı: ${tableName}`);
      }
    } catch (error) {
      console.log(`❌ Tablo bulunamadı: ${tableName}`);
    }
  }

  console.log('\n📊 ÖZET:');
  console.log(`Toplam ${existingTables.length} tablo bulundu:`);
  existingTables.forEach(table => console.log(`  - ${table}`));
  
  return existingTables;
}

checkTables().catch(console.error); 