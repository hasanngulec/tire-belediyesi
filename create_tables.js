const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://sfulbvzijpvrkbqzadtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdWxidnppanB2cmticXphZHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTYyMjEsImV4cCI6MjA2OTI3MjIyMX0.IYe5Hul_KD05o_E9ufrI9d-PT9UBBcOgifqAFJjZ8tg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  console.log('🔧 Veritabanı tabloları oluşturuluyor...\n');
  
  try {
    // 1. ETKINLIKLER tablosu için test verisi
    console.log('📋 ETKINLIKLER tablosu için test verisi ekleniyor...');
    
    const etkinliklerData = [
      {
        id: 1,
        title: 'Tire Kültür Festivali',
        description: 'Geleneksel el sanatları ve kültür etkinlikleri',
        date: '2024-06-15',
        location: 'Tire Eski Belediye Binası',
        image_url: null
      },
      {
        id: 2,
        title: 'Ramazan Etkinlikleri',
        description: 'İftar programları ve kültürel etkinlikler',
        date: '2024-04-20',
        location: 'Tire Merkez',
        image_url: null
      },
      {
        id: 3,
        title: 'Çevre Gününü Kutlama',
        description: 'Ağaç dikme ve çevre bilincini artırma etkinliği',
        date: '2024-06-05',
        location: 'Tire Millet Bahçesi',
        image_url: null
      }
    ];
    
    for (const etkinlik of etkinliklerData) {
      const { data, error } = await supabase
        .from('etkinlikler')
        .insert([etkinlik]);
      
      if (error) {
        console.log(`   ❌ Hata: ${error.message}`);
      } else {
        console.log(`   ✅ Etkinlik eklendi: ${etkinlik.title}`);
      }
    }
    
    console.log('\n');
    
    // 2. ROTALAR tablosu için test verisi
    console.log('📋 ROTALAR tablosu için test verisi ekleniyor...');
    
    const rotalarData = [
      {
        id: 1,
        name: 'Tarihi Merkez Turu',
        description: 'Tire\'nin tarihi yerlerini keşfetmek için ideal rota',
        duration: 180, // dakika cinsinden
        distance: 3.0, // km cinsinden
        difficulty: 'kolay',
        route_points: [
          { name: 'Cumhuriyet Meydanı', lat: 38.0897, lng: 27.7358 },
          { name: 'Tire Belediyesi', lat: 38.0895, lng: 27.7355 },
          { name: 'Tire Müzesi', lat: 38.0893, lng: 27.7352 },
          { name: 'Hacı Ömer Camii', lat: 38.0891, lng: 27.7349 },
          { name: 'Eski Belediye Binası', lat: 38.0889, lng: 27.7346 },
          { name: 'Tarihi Pazaryeri', lat: 38.0887, lng: 27.7343 }
        ]
      },
      {
        id: 2,
        name: 'Kültür ve Zanaat Rotası',
        description: 'El sanatları ve kültürel mekanları ziyaret etmek için özel rota',
        duration: 300, // dakika cinsinden
        distance: 5.0, // km cinsinden
        difficulty: 'orta',
        route_points: [
          { name: 'Tire Pazarı', lat: 38.0890, lng: 27.7350 },
          { name: 'Geleneksel El Sanatları Atölyeleri', lat: 38.0888, lng: 27.7347 },
          { name: 'Tire Halı Dokuma Merkezi', lat: 38.0886, lng: 27.7344 },
          { name: 'Folklor Müzesi', lat: 38.0884, lng: 27.7341 },
          { name: 'Kültür Merkezi', lat: 38.0882, lng: 27.7338 },
          { name: 'Zanaat Sokağı', lat: 38.0880, lng: 27.7335 }
        ]
      },
      {
        id: 3,
        name: 'Doğa ve Rekreasyon Turu',
        description: 'Tire\'nin doğal güzelliklerini keşfetmek için mükemmel rota',
        duration: 240, // dakika cinsinden
        distance: 8.0, // km cinsinden
        difficulty: 'zor',
        route_points: [
          { name: 'Tire Millet Bahçesi', lat: 38.0900, lng: 27.7360 },
          { name: 'Doğa Yürüyüş Parkuru', lat: 38.0902, lng: 27.7363 },
          { name: 'Piknik Alanları', lat: 38.0904, lng: 27.7366 },
          { name: 'Seyir Terası', lat: 38.0906, lng: 27.7369 },
          { name: 'Çocuk Oyun Alanları', lat: 38.0908, lng: 27.7372 }
        ]
      }
    ];
    
    for (const rota of rotalarData) {
      const { data, error } = await supabase
        .from('rotalar')
        .insert([rota]);
      
      if (error) {
        console.log(`   ❌ Hata: ${error.message}`);
      } else {
        console.log(`   ✅ Rota eklendi: ${rota.name}`);
      }
    }
    
    console.log('\n✅ Tablolar başarıyla oluşturuldu!');
    
  } catch (error) {
    console.log(`❌ Genel hata: ${error.message}`);
  }
}

createTables().catch(console.error); 