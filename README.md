# Tire Belediyesi Mobil Uygulaması

Bu uygulama Tire Belediyesi için geliştirilmiş React Native/Expo tabanlı mobil uygulamadır.

## Özellikler

- Ana Sayfa
- Etkinlikler
- Turizm ve Gezi Noktaları
- Harita
- Acil Durumlar
- Nöbetçi Eczaneler
- İletişim

## Kurulum

1. Node.js ve npm'in yüklü olduğundan emin olun
2. Expo CLI'yi yükleyin: `npm install -g @expo/cli`
3. Bağımlılıkları yükleyin: `npm install`

## Çalıştırma

### Hızlı Başlatma (Windows)
```bash
# Batch dosyası ile
start-app.bat

# PowerShell ile
.\start-app.ps1
```

### Manuel Başlatma
```bash
# Geliştirme Modu
npm run dev

# Android için
npm run expo:android

# iOS için
npm run expo:ios

# Web için
npm run expo:web
```

### Expo CLI ile
```bash
npx expo start --clear
```

## Sorun Giderme

### Remote Update Hatası
Eğer "java.io.IOException: failed to download remote update" hatası alıyorsanız:
- Bu hata remote update sistemiyle ilgilidir ve uygulamanın çalışmasını etkilemez
- Hata yakalanmış ve görmezden gelinmiştir
- Uygulama normal şekilde çalışmaya devam edecektir

### Metro Cache Temizleme
```bash
npx expo start --clear
```

### Node Modules Temizleme
```bash
Remove-Item -Recurse -Force node_modules
npm install
```

## Teknolojiler

- React Native 0.79.5
- Expo SDK 53
- React Navigation
- Supabase (Backend)
- React Native Vector Icons

## Lisans

Bu proje Tire Belediyesi için özel olarak geliştirilmiştir. 