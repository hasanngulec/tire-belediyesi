import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const municipality = "Tire Belediyesi";
  const [weather, setWeather] = useState({
    location: "Şehir Merkezi",
    temperature: null,
    status: "Hava durumu yükleniyor..."
  });

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const API_KEY = '0bbf76040ca295b36ed45c2d66937050';
      const city = 'Tire';
      const country = 'TR';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric&lang=tr`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setWeather({
          location: "Tire",
          temperature: Math.round(data.main.temp),
          status: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
        });
      } else {
        setWeather({
          location: "Şehir Merkezi",
          temperature: null,
          status: "Hava durumu alınamadı"
        });
      }
    } catch (error) {
      console.error('Hava durumu verisi alınamadı:', error);
      setWeather({
        location: "Şehir Merkezi",
        temperature: null,
        status: "Bağlantı hatası"
      });
    }
  };
  const shortcuts = [
    { title: "Nasıl Gelinir", icon: 'directions', color: '#4CAF50', onPress: () => navigation.navigate('HowToGetThere') },
    { title: "Başkanın Mesajı", icon: 'person', color: '#2196F3', onPress: () => navigation.navigate('MayorMessage') },
    { title: "Gezi Rotaları", icon: 'route', color: '#FF9800', onPress: () => navigation.navigate('TravelRoutes') },
    { title: "Influencer Rotaları", icon: 'star', color: '#E91E63', onPress: () => navigation.navigate('InfluencerRoutes') },
    { title: "Bize Ulaşın", icon: 'contact-phone', color: '#9C27B0', onPress: () => navigation.navigate('Contact') },
    { title: "Nöbetçi Eczaneler", icon: 'local-pharmacy', color: '#F44336', onPress: () => navigation.navigate('DutyPharmacies') },
    { title: "Acil Durum", icon: 'warning', color: '#FF5722', onPress: () => navigation.navigate('Emergency') }
  ];
  const about = {
    title: "Tarihçemiz",
    description: "Şehrimiz, binlerce yıllık köklü bir geçmişe sahiptir. Antik çağlardan günümüze kadar birçok medeniyete ev sahipliği yapmıştır."
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        backgroundColor="#2E5266" 
        barStyle="light-content" 
        translucent={false}
      />
      <ScrollView style={styles.scrollView}>
        {/* Karşılama Alanı */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://sfulbvzijpvrkbqzadtl.supabase.co/storage/v1/object/public/image//tiretire.png' }} 
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.headerText}>{municipality}ne{"\n"}Hoşgeldiniz</Text>
        </View>

      {/* Hava Durumu */}
      <View style={styles.weatherCard}>
        <Text style={styles.weatherTitle}>{weather.location}</Text>
        <Text style={styles.weatherDegree}>{weather.temperature ? `${weather.temperature}°C` : '--°C'}</Text>
        <Text style={styles.weatherInfo}>{weather.status}</Text>
      </View>

      {/* Hızlı Erişim */}
      <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickAccess}>
        {shortcuts.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.quickCard, { backgroundColor: item.color }]} onPress={item.onPress}>
            <Icon name={item.icon} size={32} color="white" />
            <Text style={styles.quickText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tanıtım Görseli - Tire Manzara */}
      <Image 
        source={{ uri: 'https://sfulbvzijpvrkbqzadtl.supabase.co/storage/v1/object/public/image//tire_manzara.jpeg' }} 
        style={styles.promoImage} 
        resizeMode="cover"
        onError={(error) => console.log('Image loading error:', error)}
        onLoad={() => console.log('Image loaded successfully')}
      />

      {/* Tarihçemiz */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>{about.title}</Text>
        <Text style={styles.aboutText}>
          {about.description}
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#2E5266' 
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#2E5266', 
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  logo: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    marginRight: 16,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: 'transparent',
    padding: 0,
    margin: 0
  },
  headerText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold',
    lineHeight: 24
  },
  weatherCard: { 
    backgroundColor: 'white', 
    margin: 16, 
    borderRadius: 12, 
    padding: 16, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6
  },
  weatherTitle: { 
    fontSize: 16, 
    color: '#666',
    marginBottom: 4
  },
  weatherDegree: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 4
  },
  weatherInfo: { 
    fontSize: 14, 
    color: '#999' 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#2E5266',
    marginHorizontal: 16, 
    marginTop: 20,
    marginBottom: 12
  },
  quickAccess: { 
    paddingLeft: 16, 
    marginVertical: 12 
  },
  quickCard: { 
    alignItems: 'center', 
    padding: 16, 
    marginRight: 12, 
    borderRadius: 12, 
    width: 110, 
    height: 100,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6
  },
  quickText: { 
    fontSize: 12, 
    textAlign: 'center', 
    color: 'white', 
    fontWeight: 'bold', 
    marginTop: 8,
    lineHeight: 16
  },
  promoImage: { 
    width: '92%', 
    height: 200, 
    borderRadius: 12, 
    alignSelf: 'center', 
    marginVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  aboutSection: { 
    paddingHorizontal: 16, 
    paddingBottom: 24,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  aboutText: { 
    fontSize: 15, 
    color: '#555', 
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 16
  },
});

export default HomeScreen;