import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES, TABLE_COLUMNS } from '../config/supabase';

const TourismScreen = ({ navigation }) => {
  const [tourismSpots, setTourismSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTourismSpots();
  }, []);

  const fetchTourismSpots = async () => {
    try {
      // Yeni gezi_noktalari tablosundan veri çek
      const { data, error } = await supabase
        .from(TABLES.GEZI_NOKTALARI)
        .select('*')
        .order(TABLE_COLUMNS.GEZI_NOKTALARI.AD, { ascending: true });

      if (error) {
        console.error('Error fetching tourism spots:', error);
        setTourismSpots(getDemoTourismSpots());
      } else {
        setTourismSpots(data || getDemoTourismSpots());
      }
    } catch (error) {
      console.error('Error:', error);
      setTourismSpots(getDemoTourismSpots());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getDemoTourismSpots = () => [
    {
      id: 1,
      ad: 'Tire Eski Belediye Binası',
      aciklama: 'Osmanlı döneminden kalma tarihi belediye binası',
      kategori: 'Tarihi Yapı',
      enlem: 38.0897,
      boylam: 27.7358,
      fotograf: null,
      acilis_saati: '09:00',
      kapanis_saati: '17:00',
      telefon_numarasi: '0232 123 45 67',
      adres: 'Tire Merkez'
    },
    {
      id: 2,
      ad: 'Tire Müzesi',
      aciklama: 'Tire\'nin tarihini ve kültürünü yansıtan eserler',
      kategori: 'Müze',
      enlem: 38.0893,
      boylam: 27.7352,
      fotograf: null,
      acilis_saati: '09:00',
      kapanis_saati: '18:00',
      telefon_numarasi: '0232 123 45 68',
      adres: 'Cumhuriyet Meydanı'
    },
    {
      id: 3,
      ad: 'Hacı Ömer Camii',
      aciklama: '16. yüzyıldan kalma tarihi cami',
      kategori: 'Dini Yapı',
      enlem: 38.0891,
      boylam: 27.7349,
      fotograf: null,
      acilis_saati: '05:00',
      kapanis_saati: '23:00',
      telefon_numarasi: '0232 123 45 69',
      adres: 'Eski Mahalle'
    },
    {
      id: 4,
      ad: 'Tire Pazarı',
      aciklama: 'Geleneksel Tire pazarı ve el sanatları',
      kategori: 'Kültürel',
      enlem: 38.0890,
      boylam: 27.7350,
      fotograf: null,
      acilis_saati: '08:00',
      kapanis_saati: '18:00',
      telefon_numarasi: '0232 123 45 70',
      adres: 'Pazar Yeri'
    },
    {
      id: 5,
      ad: 'Tire Millet Bahçesi',
      aciklama: 'Doğa yürüyüşü ve rekreasyon alanı',
      kategori: 'Doğa',
      enlem: 38.0900,
      boylam: 27.7360,
      fotograf: null,
      acilis_saati: '06:00',
      kapanis_saati: '22:00',
      telefon_numarasi: '0232 123 45 71',
      adres: 'Yeni Mahalle'
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchTourismSpots();
  };

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

  const TourismSpotCard = ({ spot }) => (
    <TouchableOpacity 
      style={styles.spotCard}
      onPress={() => navigation.navigate('TourismSpotDetail', { spot })}
    >
      <View style={styles.spotImageContainer}>
        {spot.fotograf ? (
          <Image source={{ uri: spot.fotograf }} style={styles.spotImage} />
        ) : (
          <View style={styles.spotImagePlaceholder}>
            <Icon name={getCategoryIcon(spot.kategori)} size={40} color={colors.primary} />
          </View>
        )}
        
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(spot.kategori) }]}>
          <Text style={styles.categoryText}>{spot.kategori}</Text>
        </View>
      </View>
      
      <View style={styles.spotContent}>
        <Text style={styles.spotTitle}>{spot.ad}</Text>
        <Text style={styles.spotDescription} numberOfLines={2}>
          {spot.aciklama}
        </Text>
        
        <View style={styles.spotDetails}>
          <View style={styles.detailRow}>
            <Icon name="access-time" size={16} color={colors.primary} />
            <Text style={styles.detailText}>
              {spot.acilis_saati} - {spot.kapanis_saati}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="location-on" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{spot.adres}</Text>
          </View>
          
          {spot.telefon_numarasi && (
            <View style={styles.detailRow}>
              <Icon name="phone" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{spot.telefon_numarasi}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={styles.loadingText}>Turizm noktaları yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Icon name="place" size={32} color={colors.white} />
          <Text style={styles.headerTitle}>Turizm Noktaları</Text>
          <Text style={styles.headerSubtitle}>
            Tire'nin tarihi ve kültürel mekanları
          </Text>
        </View>

        <View style={styles.spotsSection}>
          {tourismSpots.length > 0 ? (
            tourismSpots.map((spot) => (
              <TourismSpotCard key={spot.id} spot={spot} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="place" size={64} color={colors.gray} />
              <Text style={styles.emptyStateText}>
                Turizm noktası bilgisi bulunamadı.
              </Text>
            </View>
          )}
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
    padding: 20,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
    ...commonStyles.shadow,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    textAlign: 'center',
  },
  spotsSection: {
    paddingHorizontal: 16,
  },
  spotCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    ...commonStyles.shadow,
  },
  spotImageContainer: {
    position: 'relative',
    height: 150,
  },
  spotImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  spotImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  spotContent: {
    padding: 16,
  },
  spotTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  spotDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  spotDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  spotFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default TourismScreen; 