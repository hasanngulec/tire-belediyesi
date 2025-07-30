import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const TourismSpotDetailScreen = ({ route, navigation }) => {
  const { spot } = route.params;

  const getCategoryIcon = (kategori) => {
    switch (kategori?.toLowerCase()) {
      case 'tarihi yapı':
        return 'account-balance';
      case 'müze':
        return 'museum';
      case 'dini yapı':
        return 'mosque';
      case 'kültürel':
        return 'culture';
      case 'doğa':
        return 'park';
      default:
        return 'place';
    }
  };

  const getCategoryColor = (kategori) => {
    switch (kategori?.toLowerCase()) {
      case 'tarihi yapı':
        return '#8B4513';
      case 'müze':
        return '#4A90E2';
      case 'dini yapı':
        return '#7B68EE';
      case 'kültürel':
        return '#FF6B35';
      case 'doğa':
        return '#4CAF50';
      default:
        return colors.primary;
    }
  };

  const openPhone = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const openMaps = () => {
    if (spot.enlem && spot.boylam) {
      const url = `https://www.google.com/maps?q=${spot.enlem},${spot.boylam}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{spot.ad}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(spot.kategori) }]}>
              <Icon name={getCategoryIcon(spot.kategori)} size={16} color={colors.white} />
              <Text style={styles.categoryText}>{spot.kategori}</Text>
            </View>
          </View>
        </View>

        <View style={styles.imageContainer}>
          {spot.fotograf ? (
            <Image source={{ uri: spot.fotograf }} style={styles.spotImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name={getCategoryIcon(spot.kategori)} size={64} color={colors.primary} />
            </View>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Hakkında</Text>
            <Text style={styles.description}>{spot.aciklama}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Konum</Text>
            <View style={styles.locationInfo}>
              <Icon name="location-on" size={20} color={colors.primary} />
              <Text style={styles.locationText}>{spot.adres}</Text>
            </View>
            
            {(spot.enlem && spot.boylam) && (
              <TouchableOpacity style={styles.mapButton} onPress={openMaps}>
                <Icon name="map" size={16} color={colors.white} />
                <Text style={styles.mapButtonText}>Haritada Göster</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🕒 Çalışma Saatleri</Text>
            <View style={styles.hoursInfo}>
              <Icon name="access-time" size={20} color={colors.primary} />
              <Text style={styles.hoursText}>
                {spot.acilis_saati} - {spot.kapanis_saati}
              </Text>
            </View>
          </View>

          {spot.telefon_numarasi && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📞 İletişim</Text>
              <TouchableOpacity 
                style={styles.phoneButton}
                onPress={() => openPhone(spot.telefon_numarasi)}
              >
                <Icon name="phone" size={16} color={colors.white} />
                <Text style={styles.phoneButtonText}>{spot.telefon_numarasi}</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Ziyaret İpuçları</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tipText}>• En iyi fotoğraflar için sabah erken saatlerde gidin</Text>
              <Text style={styles.tipText}>• Çalışma saatlerini kontrol edin</Text>
              <Text style={styles.tipText}>• Fotoğraf çekmek için izin alın</Text>
              <Text style={styles.tipText}>• Yerel rehberlerden bilgi alın</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Yakındaki Yerler</Text>
            <View style={styles.nearbyList}>
              <Text style={styles.nearbyText}>• Tire Müzesi (500m)</Text>
              <Text style={styles.nearbyText}>• Hacı Ömer Camii (300m)</Text>
              <Text style={styles.nearbyText}>• Tire Pazarı (800m)</Text>
              <Text style={styles.nearbyText}>• Millet Bahçesi (1.2km)</Text>
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  imageContainer: {
    height: 200,
    backgroundColor: colors.background,
  },
  spotImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 8,
    flex: 1,
  },
  mapButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  hoursInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 8,
  },
  phoneButton: {
    backgroundColor: colors.success,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  phoneButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  nearbyList: {
    gap: 8,
  },
  nearbyText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

export default TourismSpotDetailScreen; 