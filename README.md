# Tire Belediyesi Mobil Uygulaması

Tire Belediyesi için geliştirilmiş React Native tabanlı mobil uygulama. Bu uygulama, vatandaşların belediye hizmetlerine kolay erişim sağlamasını ve şehrin turizm potansiyelini keşfetmesini amaçlamaktadır.

## 🚀 Özellikler

### 📱 Ana Bölümler
- **Ana Sayfa**: Tüm hizmetlere hızlı erişim
- **Etkinlikler**: Güncel etkinlik duyuruları ve detayları
- **Turizm**: Gezi noktaları, rotalar ve seyahat bilgileri
- **Harita**: İnteraktif harita ve önemli noktalar

### 🏛️ Belediye Hizmetleri
- **Başkanın Mesajı**: Belediye başkanından güncel mesajlar
- **Acil Durumlar**: Acil durum numaraları ve bilgileri
- **Nöbetçi Eczaneler**: Güncel nöbetçi eczane listesi
- **Bize Ulaşın**: İletişim bilgileri ve mesaj gönderme

### 🗺️ Turizm Modülü
- **Gezi Noktaları**: Tarihi ve turistik yerler
- **Gezi Rotaları**: Önerilen seyahat rotaları
- **Nasıl Gelinir**: Ulaşım seçenekleri ve yol tarifleri
- **Influencer Rotaları**: Sosyal medya fenomenlerinden özel öneriler

## 🛠️ Teknoloji Stack

- **Framework**: React Native 0.72.6
- **Navigation**: React Navigation 6.x
- **State Management**: React Hooks
- **Database**: Supabase
- **Maps**: React Native Maps
- **Icons**: React Native Vector Icons
- **Styling**: StyleSheet (React Native)

## 📋 Gereksinimler

### Sistem Gereksinimleri
- Node.js 16 veya üzeri
- React Native CLI
- Android Studio (Android geliştirme için)
- Xcode (iOS geliştirme için - sadece macOS)

### Bağımlılıklar
- React Native 0.72.6
- React Navigation
- Supabase Client
- React Native Vector Icons
- React Native Maps

## 🔧 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd tirebel
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. iOS Bağımlılıklarını Yükleyin (sadece iOS için)
```bash
cd ios && pod install && cd ..
```

### 4. Supabase Yapılandırması
`src/config/supabase.js` dosyasında Supabase URL ve API anahtarınızı güncelleyin:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
```

### 5. Android İçin Ek Yapılandırma

#### Vector Icons
`android/app/build.gradle` dosyasına ekleyin:
```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

#### Maps
`android/app/src/main/res/values/strings.xml` dosyasına Google Maps API anahtarınızı ekleyin:
```xml
<string name="google_maps_api_key">YOUR_GOOGLE_MAPS_API_KEY</string>
```

### 6. iOS İçin Ek Yapılandırma

#### Info.plist
iOS için gerekli izinleri `ios/tirebel/Info.plist` dosyasına ekleyin:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Bu uygulama konum bilgisini harita özellikleri için kullanır.</string>
```

## 🚀 Uygulamayı Çalıştırma

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Metro Bundler'ı Başlatma
```bash
npm start
```

## 📊 Veritabanı Şeması

Uygulama Supabase kullanarak aşağıdaki tabloları destekler:

### Tablolar
- `events` - Etkinlik bilgileri
- `tourism_spots` - Turizm noktaları
- `travel_routes` - Seyahat rotaları
- `emergency_contacts` - Acil durum iletişim bilgileri
- `duty_pharmacies` - Nöbetçi eczane bilgileri
- `news` - Haber ve duyurular
- `mayor_messages` - Başkan mesajları
- `contact_info` - İletişim bilgileri

### Örnek Tablo Yapısı (events)
```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE,
    event_time TIME,
    location VARCHAR(255),
    image_url TEXT,
    organizer VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: #2E5266 (Koyu mavi)
- **Secondary**: #6C5B7B (Mor)
- **Accent**: #F8B500 (Turuncu)
- **Background**: #F5F5F5 (Açık gri)
- **Success**: #4CAF50 (Yeşil)
- **Warning**: #FF9800 (Turuncu)
- **Error**: #F44336 (Kırmızı)

### Tipografi
- **Title**: 24px, Bold
- **Subtitle**: 18px, Semi-bold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular

## 📱 Ekran Görüntüleri

Uygulama ekran tasarımları `gorseller/` klasöründe bulunmaktadır:
- Ana sayfa
- Etkinlikler listesi ve detayı
- Gezi noktaları
- Harita görünümü
- İletişim sayfası
- Ve daha fazlası...

## 🔒 Güvenlik

- API anahtarları environment variables olarak saklanmalıdır
- Supabase Row Level Security (RLS) kullanılmalıdır
- Kullanıcı girdileri validate edilmelidir
- HTTPS kullanımı zorunludur

## 📈 Performans

- Lazy loading ile sayfa yükleme optimizasyonu
- Image caching için React Native Fast Image kullanımı önerilir
- Bundle boyutunu küçültmek için kod splitting uygulanabilir

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 Destek

Herhangi bir sorun yaşarsanız veya sorularınız varsa:
- Issue oluşturun
- Email: support@tirebelediyesi.gov.tr
- Telefon: 0232 512 60 20

## 🔄 Sürüm Geçmişi

### v1.0.0 (2024-01-15)
- İlk sürüm yayınlandı
- Temel belediye hizmetleri eklendi
- Turizm modülü tamamlandı
- Harita entegrasyonu eklendi

## 🚧 Gelecek Özellikler

- [ ] Push notification desteği
- [ ] Offline mod
- [ ] Çoklu dil desteği
- [ ] Dark mode
- [ ] Gelişmiş harita özellikleri
- [ ] QR kod scanner
- [ ] Augmented Reality (AR) tur rehberi

---

**Tire Belediyesi** | *Teknoloji ile Hizmet* 