const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://sfulbvzijpvrkbqzadtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdWxidnppanB2cmticXphZHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTYyMjEsImV4cCI6MjA2OTI3MjIyMX0.IYe5Hul_KD05o_E9ufrI9d-PT9UBBcOgifqAFJjZ8tg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTableStructure() {
  console.log('🔍 Tablo yapıları detaylı inceleniyor...\n');
  
  const tables = ['etkinlikler', 'rotalar'];
  
  for (const tableName of tables) {
    console.log(`📋 ${tableName.toUpperCase()} tablosu:`);
    
    try {
      // Tüm verileri çek
      const { data, error } = await supabase
        .from(tableName)
        .select('*');
      
      if (!error) {
        console.log(`✅ Tablo erişilebilir`);
        console.log(`📊 Toplam kayıt sayısı: ${data.length}`);
        
        if (data.length > 0) {
          console.log(`📋 Sütunlar:`);
          const columns = Object.keys(data[0]);
          columns.forEach((col, index) => {
            console.log(`   ${index + 1}. ${col}`);
          });
          
          // İlk kaydı göster
          console.log(`\n📄 İlk kayıt örneği:`);
          console.log(JSON.stringify(data[0], null, 2));
        } else {
          console.log(`📋 Tablo boş - sütun yapısı bilinmiyor`);
          
          // Farklı sütun isimleri deneyelim
          console.log(`\n🧪 Farklı sütun isimleri deneniyor...`);
          
          if (tableName === 'etkinlikler') {
            const possibleColumns = [
              ['title', 'description', 'date', 'location', 'image_url'],
              ['baslik', 'aciklama', 'tarih', 'konum', 'resim_url'],
              ['name', 'description', 'date', 'location', 'image_url'],
              ['isim', 'aciklama', 'tarih', 'konum', 'resim_url'],
              ['event_title', 'event_description', 'event_date', 'event_location', 'event_image'],
              ['etkinlik_baslik', 'etkinlik_aciklama', 'etkinlik_tarih', 'etkinlik_konum', 'etkinlik_resim']
            ];
            
            for (const columns of possibleColumns) {
              const testData = {};
              columns.forEach(col => {
                if (col.includes('title') || col.includes('baslik') || col.includes('name') || col.includes('isim')) {
                  testData[col] = 'Test Etkinlik';
                } else if (col.includes('description') || col.includes('aciklama')) {
                  testData[col] = 'Bu bir test etkinliğidir';
                } else if (col.includes('date') || col.includes('tarih')) {
                  testData[col] = '2024-01-15';
                } else if (col.includes('location') || col.includes('konum')) {
                  testData[col] = 'Tire Merkez';
                } else if (col.includes('image') || col.includes('resim')) {
                  testData[col] = null;
                }
              });
              
              console.log(`   Denenen sütunlar: ${columns.join(', ')}`);
              
              const { data: insertData, error: insertError } = await supabase
                .from(tableName)
                .insert([testData])
                .select();
                
              if (!insertError) {
                console.log(`   ✅ Başarılı! Sütunlar: ${Object.keys(insertData[0]).join(', ')}`);
                
                // Test verisini sil
                await supabase
                  .from(tableName)
                  .delete()
                  .eq(columns[0], 'Test Etkinlik');
                break;
              } else {
                console.log(`   ❌ Başarısız: ${insertError.message}`);
              }
            }
          } else if (tableName === 'rotalar') {
            const possibleColumns = [
              ['name', 'description', 'duration', 'distance', 'difficulty', 'route_points'],
              ['isim', 'aciklama', 'sure', 'mesafe', 'zorluk', 'rota_noktalari'],
              ['title', 'description', 'duration', 'distance', 'difficulty', 'route_points'],
              ['baslik', 'aciklama', 'sure', 'mesafe', 'zorluk', 'rota_noktalari'],
              ['route_name', 'route_description', 'route_duration', 'route_distance', 'route_difficulty', 'route_points'],
              ['rota_isim', 'rota_aciklama', 'rota_sure', 'rota_mesafe', 'rota_zorluk', 'rota_noktalari']
            ];
            
            for (const columns of possibleColumns) {
              const testData = {};
              columns.forEach(col => {
                if (col.includes('name') || col.includes('isim') || col.includes('title') || col.includes('baslik')) {
                  testData[col] = 'Test Rotası';
                } else if (col.includes('description') || col.includes('aciklama')) {
                  testData[col] = 'Bu bir test rotasıdır';
                } else if (col.includes('duration') || col.includes('sure')) {
                  testData[col] = 120;
                } else if (col.includes('distance') || col.includes('mesafe')) {
                  testData[col] = 5.0;
                } else if (col.includes('difficulty') || col.includes('zorluk')) {
                  testData[col] = 'kolay';
                } else if (col.includes('route_points') || col.includes('rota_noktalari')) {
                  testData[col] = [
                    { name: 'Başlangıç', lat: 38.0897, lng: 27.7358 },
                    { name: 'Bitiş', lat: 38.0895, lng: 27.7355 }
                  ];
                }
              });
              
              console.log(`   Denenen sütunlar: ${columns.join(', ')}`);
              
              const { data: insertData, error: insertError } = await supabase
                .from(tableName)
                .insert([testData])
                .select();
                
              if (!insertError) {
                console.log(`   ✅ Başarılı! Sütunlar: ${Object.keys(insertData[0]).join(', ')}`);
                
                // Test verisini sil
                await supabase
                  .from(tableName)
                  .delete()
                  .eq(columns[0], 'Test Rotası');
                break;
              } else {
                console.log(`   ❌ Başarısız: ${insertError.message}`);
              }
            }
          }
        }
      } else {
        console.log(`❌ Tablo erişilemedi: ${error.message}`);
      }
    } catch (error) {
      console.log(`❌ Hata: ${error.message}`);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
  }
}

checkTableStructure().catch(console.error); 