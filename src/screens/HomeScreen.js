import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const quickAccessItems = [
    { title: 'Nasıl Gelinir', icon: 'directions', color: '#4CAF50', onPress: () => navigation.navigate('HowToGetThere') },
    { title: 'Başkanın Mesajı', icon: 'person', color: '#2196F3', onPress: () => navigation.navigate('MayorMessage') },
    { title: 'Gezi Rotaları', icon: 'route', color: '#FF9800', onPress: () => navigation.navigate('TravelRoutes') },
    { title: 'Influencer Önerileri', icon: 'star', color: '#E91E63', onPress: () => navigation.navigate('InfluencerRoutes') },
    { title: 'Bize Ulaşın', icon: 'contact-phone', color: '#9C27B0', onPress: () => navigation.navigate('Contact') },
    { title: 'Nöbetçi Eczaneler', icon: 'local-pharmacy', color: '#F44336', onPress: () => navigation.navigate('DutyPharmacies') },
    { title: 'Acil Durum', icon: 'warning', color: '#FF5722', onPress: () => navigation.navigate('Emergency') }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Üst Header */}
      <View style={styles.header}>
        <View style={styles.logo} />
        <Text style={styles.headerText}>X Belediyesine{"\n"}Hoşgeldiniz</Text>
      </View>

      {/* Hava Durumu */}
      <View style={styles.weatherCard}>
        <Text style={styles.weatherTitle}>Şehir Merkezi</Text>
        <Text style={styles.weatherDegree}>--°C</Text>
        <Text style={styles.weatherInfo}>Hava durumu alınamadı</Text>
      </View>

      {/* Hızlı Erişim */}
      <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickAccess}>
        {quickAccessItems.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.quickCard, { backgroundColor: item.color }]} onPress={item.onPress}>
            <Icon name={item.icon} size={32} color="white" />
            <Text style={styles.quickText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tanıtım Görseli - Camii */}
      <Image 
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Blue_Mosque%2C_Istanbul%2C_Turkey_%285467544025%29.jpg/1024px-Blue_Mosque%2C_Istanbul%2C_Turkey_%285467544025%29.jpg' }} 
        style={styles.promoImage} 
      />

      {/* Tarihçemiz */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>Tarihçemiz</Text>
        <Text style={styles.aboutText}>
          Şehrimiz, binlerce yıllık köklü bir geçmişe sahiptir. Antik çağlardan günümüze kadar birçok medeniyete ev sahipliği yapmıştır.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1976D2', padding: 16 },
  logo: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', marginRight: 12 },
  headerText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  weatherCard: { backgroundColor: '#f9f9f9', margin: 16, borderRadius: 10, padding: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  weatherTitle: { fontSize: 14 },
  weatherDegree: { fontSize: 24, fontWeight: 'bold' },
  weatherInfo: { fontSize: 12, color: 'gray' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, marginTop: 16 },
  quickAccess: { paddingLeft: 16, marginVertical: 10 },
  quickCard: { 
    alignItems: 'center', 
    padding: 12, 
    marginRight: 12, 
    borderRadius: 10, 
    width: 100, 
    height: 90,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  quickText: { fontSize: 11, textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: 4 },
  promoImage: { width: '90%', height: 180, borderRadius: 10, alignSelf: 'center', marginVertical: 16 },
  aboutSection: { paddingHorizontal: 16, paddingBottom: 20 },
  aboutText: { fontSize: 14, color: '#333', marginTop: 8 },
});

export default HomeScreen;