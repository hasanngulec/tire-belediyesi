import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const HowToGetThereScreen = ({ navigation }) => {
  const address = "Cumhuriyet Mahallesi, Belediye Caddesi No:1, 06000 Merkez";
  const transportation = [
    {
      type: "Otobüs",
      icon: "directions-bus",
      description: "Şehir merkezi otobüs hatları ile kolayca ulaşabilirsiniz",
      details: ["12, 23, 45 numaralı otobüsler", "Her 15 dakikada bir sefer", "Bilet ücreti: 3.50 TL"]
    },
    {
      type: "Özel Araç",
      icon: "directions-car",
      description: "Merkez konumunda otopark imkanı mevcuttur",
      details: ["Ücretsiz otopark", "200 araç kapasiteli", "7/24 güvenlik"]
    },
    {
      type: "Yürüyerek",
      icon: "directions-walk",
      description: "Şehir merkezinden sadece 10 dakika yürüme mesafesi",
      details: ["Yaya yolları mevcut", "Engelli erişimi", "Güvenli güzergah"]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nasıl Gelinir</Text>
                            <Text style={styles.headerSubtitle}>Tire Belediyesi merkez binasına ulaşım seçenekleri</Text>
      </View>

      {/* Address Box */}
      <View style={styles.addressBox}>
        <Text style={styles.addressTitle}>Adres</Text>
        <Text style={styles.addressText}>{address}</Text>
        <TouchableOpacity 
          style={styles.mapButton} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Map', {
            spot: {
              ad: 'Tire Belediyesi',
              aciklama: 'Tire Belediyesi merkez binası',
              enlem: 38.0931,
              boylam: 27.7519,
              kategori: 'belediye'
            }
          })}
        >
          <Text style={styles.mapButtonText}>Haritada Göster</Text>
        </TouchableOpacity>
      </View>

      {/* Transportation Options */}
      <Text style={styles.sectionTitle}>Ulaşım Seçenekleri</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.transportationScroll}>
        {transportation.map((option, index) => (
          <View key={index} style={styles.transportationCard}>
            <Icon name={option.icon} size={32} color="#1976D2" />
            <Text style={styles.transportationType}>{option.type}</Text>
            <Text style={styles.transportationDescription}>{option.description}</Text>
            {option.details.map((detail, idx) => (
              <Text key={idx} style={styles.transportationDetail}>{detail}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  addressBox: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  mapButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5266',
    marginLeft: 20,
    marginTop: 20,
  },
  transportationScroll: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  transportationCard: {
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transportationType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
    marginTop: 8,
  },
  transportationDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  transportationDetail: {
    fontSize: 12,
    color: '#999',
  },
});

export default HowToGetThereScreen; 