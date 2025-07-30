// Tire Belediyesi Uygulaması Test Dosyası
// Bu dosya uygulamanın temel bileşenlerinin çalışıp çalışmadığını test eder

console.log('🚀 Tire Belediyesi Uygulaması Test Başlatılıyor...');

// Test 1: React Native ve Expo kontrolü
try {
  const React = require('react');
  console.log('✅ React yüklendi');
} catch (error) {
  console.log('❌ React yüklenemedi:', error.message);
}

// Test 2: Expo kontrolü
try {
  const { registerRootComponent } = require('expo');
  console.log('✅ Expo yüklendi');
} catch (error) {
  console.log('❌ Expo yüklenemedi:', error.message);
}

// Test 3: Package.json kontrolü
try {
  const packageJson = require('./package.json');
  console.log('✅ Package.json yüklendi - Versiyon:', packageJson.version);
} catch (error) {
  console.log('❌ Package.json yüklenemedi:', error.message);
}

// Test 4: App.js dosyası kontrolü
try {
  const fs = require('fs');
  const appJsExists = fs.existsSync('./src/App.js');
  console.log('✅ App.js dosyası mevcut:', appJsExists);
} catch (error) {
  console.log('❌ App.js kontrolü başarısız:', error.message);
}

// Test 5: Supabase konfigürasyonu kontrolü
try {
  const fs = require('fs');
  const supabaseExists = fs.existsSync('./src/config/supabase.js');
  console.log('✅ Supabase konfigürasyonu mevcut:', supabaseExists);
} catch (error) {
  console.log('❌ Supabase kontrolü başarısız:', error.message);
}

console.log('');
console.log('🎉 Test tamamlandı!');
console.log('');
console.log('📱 Uygulamayı çalıştırmak için:');
console.log('   npm run dev');
console.log('');
console.log('📱 Android için:');
console.log('   npm run expo:android');
console.log('');
console.log('📱 iOS için:');
console.log('   npm run expo:ios');
console.log('');
console.log('🌐 Web için:');
console.log('   npm run expo:web');
console.log('');
console.log('⚠️  Not: JSX dosyaları Node.js ile doğrudan test edilemez.');
console.log('   Bu dosyalar React Native/Expo ortamında çalışır.'); 