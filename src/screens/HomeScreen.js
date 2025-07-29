import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import MenuCard from '../components/MenuCard';
import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
  const menuItems = [
    {
      title: 'Başkanın Mesajı',
      subtitle: 'Belediye başkanımızdan mesajlar',
      iconName: 'person',
      onPress: () => navigation.navigate('MayorMessage'),
    },
    {
      title: 'Etkinlikler',
      subtitle: 'Güncel etkinlikler ve duyurular',
      iconName: 'event',
      onPress: () => navigation.navigate('Events', { screen: 'EventsList' }),
    },
    {
      title: 'Gezi Noktaları',
      subtitle: 'Tire\'nin tarihi ve turistik yerleri',
      iconName: 'place',
      onPress: () => navigation.navigate('Tourism', { screen: 'TourismSpots' }),
    },
    {
      title: 'Gezi Rotaları',
      subtitle: 'Önerilen gezi rotaları',
      iconName: 'directions',
      onPress: () => navigation.navigate('Tourism', { screen: 'TravelRoutes' }),
    },
    {
      title: 'Harita',
      subtitle: 'İnteraktif harita görünümü',
      iconName: 'map',
      onPress: () => navigation.navigate('Map'),
    },
    {
      title: 'Acil Durumlar',
      subtitle: 'Acil durum bilgileri ve numaraları',
      iconName: 'warning',
      onPress: () => navigation.navigate('Emergency'),
    },
    {
      title: 'Nöbetçi Eczaneler',
      subtitle: 'Güncel nöbetçi eczane listesi',
      iconName: 'local-pharmacy',
      onPress: () => navigation.navigate('DutyPharmacies'),
    },
    {
      title: 'Bize Ulaşın',
      subtitle: 'İletişim bilgileri ve mesaj gönderme',
      iconName: 'contact-mail',
      onPress: () => navigation.navigate('Contact'),
    },
  ];

  return (
    <View style={commonStyles.container}>
      <Header title="TİRE BELEDİYESİ" showLogo={true} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Hoş Geldiniz</Text>
          <Text style={styles.welcomeText}>
            Tire Belediyesi mobil uygulamasına hoş geldiniz. 
            Şehrimizin hizmetlerine kolayca erişebilirsiniz.
          </Text>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Hizmetler</Text>
          {menuItems.map((item, index) => (
            <MenuCard
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              iconName={item.iconName}
              onPress={item.onPress}
            />
          ))}
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            © 2024 Tire Belediyesi - Tüm hakları saklıdır
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: colors.white,
    margin: 16,
    borderRadius: 12,
    ...commonStyles.shadow,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  menuSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginLeft: 16,
    marginBottom: 8,
  },
  footerSection: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default HomeScreen; 