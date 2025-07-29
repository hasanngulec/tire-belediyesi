import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES } from '../config/supabase';

const TourismScreen = ({ navigation }) => {
  const [tourismSpots, setTourismSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTourismSpots();
  }, []);

  const fetchTourismSpots = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.TOURISM_SPOTS)
        .select('*')
        .order('rating', { ascending: false });

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
      name: 'Tire Eski Belediye Binası',
      description: 'Osmanlı döneminden kalma tarihi belediye binası',
      category: 'Tarihi Yapı',
      rating: 4.5,
      visit_duration: '30 dakika',
      entrance_fee: 'Ücretsiz',
      image_url: null,
      location: 'Tire Merkez',
    },
    {
      id: 2,
      name: 'Tire Müzesi',
      description: 'Tire\'nin tarihini ve kültürünü yansıtan eserler',
      category: 'Müze',
      rating: 4.3,
      visit_duration: '1-2 saat',
      entrance_fee: '10 TL',
      image_url: null,
      location: 'Cumhuriyet Meydanı',
    },
    {
      id: 3,
      name: 'Hacı Ömer Camii',
      description: '16. yüzyıldan kalma tarihi cami',
      category: 'Dini Yapı',
      rating: 4.7,
      visit_duration: '20 dakika',
      entrance_fee: 'Ücretsiz',
      image_url: null,
      location: 'Eski Mahalle',
    },
    {
      id: 4,
      name: 'Tire Pazarı',
      description: 'Geleneksel Tire pazarı ve el sanatları',
      category: 'Kültürel',
      rating: 4.2,
      visit_duration: '2-3 saat',
      entrance_fee: 'Ücretsiz',
      image_url: null,
      location: 'Pazar Yeri',
    },
    {
      id: 5,
      name: 'Tire Millet Bahçesi',
      description: 'Doğa yürüyüşü ve rekreasyon alanı',
      category: 'Doğa',
      rating: 4.0,
      visit_duration: '1-3 saat',
      entrance_fee: 'Ücretsiz',
      image_url: null,
      location: 'Yeni Mahalle',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchTourismSpots();
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Tarihi Yapı': return 'account-balance';
      case 'Müze': return 'museum';
      case 'Dini Yapı': return 'place-of-worship';
      case 'Kültürel': return 'festival';
      case 'Doğa': return 'nature';
      default: return 'place';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Tarihi Yapı': return '#8D6E63';
      case 'Müze': return '#5E35B1';
      case 'Dini Yapı': return '#00ACC1';
      case 'Kültürel': return '#FB8C00';
      case 'Doğa': return '#43A047';
      default: return colors.primary;
    }
  };

  const TourismSpotCard = ({ spot }) => (
    <TouchableOpacity 
      style={styles.spotCard}
      onPress={() => navigation.navigate('TourismSpotDetail', { spot })}
    >
      <View style={styles.spotImageContainer}>
        {spot.image_url ? (
          <Image source={{ uri: spot.image_url }} style={styles.spotImage} />
        ) : (
          <View style={[styles.spotImagePlaceholder, { backgroundColor: getCategoryColor(spot.category) + '20' }]}>
            <Icon name={getCategoryIcon(spot.category)} size={40} color={getCategoryColor(spot.category)} />
          </View>
        )}
        
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(spot.category) }]}>
          <Text style={styles.categoryText}>{spot.category}</Text>
        </View>
      </View>

      <View style={styles.spotContent}>
        <Text style={styles.spotName}>{spot.name}</Text>
        <Text style={styles.spotDescription} numberOfLines={2}>
          {spot.description}
        </Text>

        <View style={styles.spotDetails}>
          <View style={styles.detailRow}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.detailText}>{spot.rating}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="access-time" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>{spot.visit_duration}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="attach-money" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>{spot.entrance_fee}</Text>
          </View>
        </View>

        <View style={styles.spotFooter}>
          <View style={styles.locationRow}>
            <Icon name="place" size={16} color={colors.primary} />
            <Text style={styles.locationText}>{spot.location}</Text>
          </View>
          <Icon name="chevron-right" size={24} color={colors.gray} />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={styles.loadingText}>Gezi noktaları yükleniyor...</Text>
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
          <Text style={styles.headerTitle}>Gezi Noktaları</Text>
          <Text style={styles.headerSubtitle}>
            Tire'nin tarihi ve turistik yerlerini keşfedin
          </Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('TravelRoutes')}
          >
            <Icon name="directions" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Gezi Rotaları</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('HowToGetThere')}
          >
            <Icon name="directions-car" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Nasıl Gelinir</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('InfluencerRoutes')}
          >
            <Icon name="star" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Özel Rotalar</Text>
          </TouchableOpacity>
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
                Gezi noktası bilgisi bulunamadı.
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
  spotName: {
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