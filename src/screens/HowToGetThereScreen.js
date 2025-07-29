import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const HowToGetThereScreen = () => {
  const transportationOptions = [
    {
      id: 1,
      type: 'Özel Araç',
      icon: 'directions-car',
      description: 'İzmir\'den yaklaşık 45 dakika',
      routes: [
        'İzmir - Tire: D300 karayolu üzerinden',
        'Ankara - Tire: E90/E87 üzerinden İzmir\'e, sonra D300',
        'İstanbul - Tire: O-5 üzerinden İzmir\'e, sonra D300'
      ],
      parking: 'Şehir merkezinde ücretsiz park alanları mevcuttur.',
      color: colors.primary,
    },
    {
      id: 2,
      type: 'Otobüs',
      icon: 'directions-bus',
      description: 'İzmir\'den düzenli otobüs seferleri',
      routes: [
        'İzmir Büyükşehir Belediyesi otobüsleri',
        'Günlük sefer saatleri: 06:00 - 22:00 arası',
        'Sefer süresi: 45-60 dakika'
      ],
      parking: 'Tire Otogar - Şehir merkezi 5 dakika yürüme mesafesi',
      color: '#4CAF50',
    },
    {
      id: 3,
      type: 'Tren',
      icon: 'train',
      description: 'TCDD ile Tire İstasyonu',
      routes: [
        'İzmir Alsancak - Tire treni',
        'Günde 3-4 sefer mevcuttur',
        'Yolculuk süresi: 1 saat 15 dakika'
      ],
      parking: 'Tire Tren İstasyonu - Merkeze 10 dakika yürüme',
      color: '#FF9800',
    },
    {
      id: 4,
      type: 'Havayolu',
      icon: 'flight',
      description: 'En yakın havaalanı İzmir Adnan Menderes',
      routes: [
        'Adnan Menderes Havaalanı - Tire: 70 km',
        'Havaalanından otobüs ile İzmir merkez, sonra Tire otobüsü',
        'Taksi veya kiralık araç seçenekleri mevcuttur'
      ],
      parking: 'Toplam yolculuk süresi: 1.5-2 saat',
      color: '#2196F3',
    },
  ];

  const importantPoints = [
    {
      title: 'Şehir Merkezi',
      address: 'Cumhuriyet Meydanı, Tire Merkez',
      coordinates: '38.0851° K, 27.7506° D',
      icon: 'business',
    },
    {
      title: 'Tire Otogar',
      address: 'Yeni Mahalle, Otogar Cad.',
      coordinates: '38.0845° K, 27.7520° D',
      icon: 'directions-bus',
    },
    {
      title: 'Tire Tren İstasyonu',
      address: 'İstasyon Mahallesi',
      coordinates: '38.0840° K, 27.7485° D',
      icon: 'train',
    },
  ];

  const openMaps = (address) => {
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(address + ', Tire, İzmir')}`;
    Linking.openURL(url);
  };

  const TransportationCard = ({ option }) => (
    <View style={[styles.transportCard, { borderLeftColor: option.color }]}>
      <View style={styles.transportHeader}>
        <View style={[styles.transportIcon, { backgroundColor: option.color }]}>
          <Icon name={option.icon} size={24} color={colors.white} />
        </View>
        <View style={styles.transportInfo}>
          <Text style={styles.transportType}>{option.type}</Text>
          <Text style={styles.transportDescription}>{option.description}</Text>
        </View>
      </View>

      <View style={styles.routesList}>
        {option.routes.map((route, index) => (
          <View key={index} style={styles.routeItem}>
            <Icon name="chevron-right" size={16} color={colors.primary} />
            <Text style={styles.routeText}>{route}</Text>
          </View>
        ))}
      </View>

      <View style={styles.parkingInfo}>
        <Icon name="info" size={16} color={colors.info} />
        <Text style={styles.parkingText}>{option.parking}</Text>
      </View>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Icon name="directions" size={32} color={colors.white} />
          <Text style={styles.headerTitle}>Nasıl Gelinir</Text>
          <Text style={styles.headerSubtitle}>
            Tire'ye ulaşım seçenekleri ve yol tarifleri
          </Text>
        </View>

        <View style={styles.quickInfoSection}>
          <View style={styles.quickInfoCard}>
            <Icon name="place" size={24} color={colors.primary} />
            <View style={styles.quickInfoText}>
              <Text style={styles.quickInfoTitle}>Tire Konumu</Text>
              <Text style={styles.quickInfoValue}>İzmir ili, Ege Bölgesi</Text>
              <Text style={styles.quickInfoValue}>38.0851° K, 27.7506° D</Text>
            </View>
          </View>
        </View>

        <View style={styles.transportSection}>
          <Text style={styles.sectionTitle}>Ulaşım Seçenekleri</Text>
          {transportationOptions.map((option) => (
            <TransportationCard key={option.id} option={option} />
          ))}
        </View>

        <View style={styles.pointsSection}>
          <Text style={styles.sectionTitle}>Önemli Noktalar</Text>
          {importantPoints.map((point, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.pointCard}
              onPress={() => openMaps(point.address)}
            >
              <View style={styles.pointIcon}>
                <Icon name={point.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.pointInfo}>
                <Text style={styles.pointTitle}>{point.title}</Text>
                <Text style={styles.pointAddress}>{point.address}</Text>
                <Text style={styles.pointCoordinates}>{point.coordinates}</Text>
              </View>
              <Icon name="directions" size={20} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Seyahat İpuçları</Text>
          
          <View style={styles.tipCard}>
            <Icon name="schedule" size={20} color={colors.success} />
            <Text style={styles.tipText}>
              En iyi ziyaret zamanı ilkbahar ve sonbahar aylarıdır.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Icon name="local-gas-station" size={20} color={colors.warning} />
            <Text style={styles.tipText}>
              Özel araçla geliyorsanız, yolda benzin istasyonları mevcuttur.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Icon name="restaurant" size={20} color={colors.info} />
            <Text style={styles.tipText}>
              Şehir merkezinde birçok restoran ve kafe bulunmaktadır.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Icon name="hotel" size={20} color={colors.secondary} />
            <Text style={styles.tipText}>
              Konaklama için şehir merkezinde oteller ve pansiyonlar mevcuttur.
            </Text>
          </View>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Yardım ve Bilgi</Text>
          <View style={styles.contactCard}>
            <Icon name="contact-phone" size={24} color={colors.primary} />
            <View style={styles.contactText}>
              <Text style={styles.contactTitle}>Tire Belediyesi</Text>
              <Text style={styles.contactPhone}>0232 512 60 20</Text>
              <Text style={styles.contactDescription}>
                Ulaşım ve konaklama konularında yardım alabilirsiniz.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 8,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  quickInfoSection: {
    padding: 16,
  },
  quickInfoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  quickInfoText: {
    marginLeft: 12,
    flex: 1,
  },
  quickInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  quickInfoValue: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  transportSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  transportCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    ...commonStyles.shadow,
  },
  transportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  transportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transportInfo: {
    flex: 1,
  },
  transportType: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  transportDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  routesList: {
    marginBottom: 12,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  routeText: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
  },
  parkingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
    gap: 8,
  },
  parkingText: {
    fontSize: 12,
    color: colors.text.secondary,
    flex: 1,
  },
  pointsSection: {
    padding: 16,
  },
  pointCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  pointIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pointInfo: {
    flex: 1,
  },
  pointTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  pointAddress: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  pointCoordinates: {
    fontSize: 12,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  tipsSection: {
    padding: 16,
  },
  tipCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...commonStyles.shadow,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
  contactSection: {
    padding: 16,
    paddingBottom: 32,
  },
  contactCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  contactText: {
    marginLeft: 12,
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

export default HowToGetThereScreen; 