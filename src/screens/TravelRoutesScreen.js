import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES } from '../config/supabase';

const TravelRoutesScreen = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.TRAVEL_ROUTES)
        .select('*')
        .order('difficulty_level', { ascending: true });

      if (error) {
        console.error('Error fetching routes:', error);
        setRoutes(getDemoRoutes());
      } else {
        setRoutes(data || getDemoRoutes());
      }
    } catch (error) {
      console.error('Error:', error);
      setRoutes(getDemoRoutes());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getDemoRoutes = () => [
    {
      id: 1,
      name: 'Tarihi Merkez Turu',
      description: 'Tire\'nin tarihi yerlerini keşfetmek için ideal rota',
      duration: '2-3 saat',
      distance: '3 km',
      difficulty_level: 1,
      starting_point: 'Cumhuriyet Meydanı',
      stops: [
        'Tire Belediyesi',
        'Tire Müzesi',
        'Hacı Ömer Camii',
        'Eski Belediye Binası',
        'Tarihi Pazaryeri'
      ],
      transportation: 'Yürüyüş',
      best_time: 'Sabah 09:00 - 12:00',
    },
    {
      id: 2,
      name: 'Kültür ve Zanaat Rotası',
      description: 'El sanatları ve kültürel mekanları ziyaret etmek için özel rota',
      duration: '4-5 saat',
      distance: '5 km',
      difficulty_level: 2,
      starting_point: 'Tire Pazarı',
      stops: [
        'Geleneksel El Sanatları Atölyeleri',
        'Tire Halı Dokuma Merkezi',
        'Folklor Müzesi',
        'Kültür Merkezi',
        'Zanaat Sokağı'
      ],
      transportation: 'Yürüyüş + Bisiklet',
      best_time: 'Öğleden sonra 14:00 - 18:00',
    },
    {
      id: 3,
      name: 'Doğa ve Rekreasyon Turu',
      description: 'Tire\'nin doğal güzelliklerini keşfetmek için mükemmel rota',
      duration: '3-4 saat',
      distance: '8 km',
      difficulty_level: 3,
      starting_point: 'Tire Millet Bahçesi',
      stops: [
        'Millet Bahçesi',
        'Doğa Yürüyüş Parkuru',
        'Piknik Alanları',
        'Seyir Terası',
        'Çocuk Oyun Alanları'
      ],
      transportation: 'Yürüyüş + Bisiklet',
      best_time: 'Sabah 08:00 - 12:00',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchRoutes();
  };

  const getDifficultyInfo = (level) => {
    switch (level) {
      case 1:
        return { text: 'Kolay', color: '#4CAF50', icon: 'sentiment-satisfied' };
      case 2:
        return { text: 'Orta', color: '#FF9800', icon: 'sentiment-neutral' };
      case 3:
        return { text: 'Zor', color: '#F44336', icon: 'sentiment-dissatisfied' };
      default:
        return { text: 'Bilinmiyor', color: colors.gray, icon: 'help' };
    }
  };

  const getTransportationIcon = (transportation) => {
    if (transportation.includes('Yürüyüş')) return 'directions-walk';
    if (transportation.includes('Bisiklet')) return 'directions-bike';
    if (transportation.includes('Araç')) return 'directions-car';
    return 'directions';
  };

  const RouteCard = ({ route }) => {
    const difficulty = getDifficultyInfo(route.difficulty_level);
    
    return (
      <TouchableOpacity style={styles.routeCard}>
        <View style={styles.routeHeader}>
          <Text style={styles.routeName}>{route.name}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: difficulty.color }]}>
            <Icon name={difficulty.icon} size={16} color={colors.white} />
            <Text style={styles.difficultyText}>{difficulty.text}</Text>
          </View>
        </View>

        <Text style={styles.routeDescription}>{route.description}</Text>

        <View style={styles.routeDetails}>
          <View style={styles.detailRow}>
            <Icon name="access-time" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{route.duration}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="straighten" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{route.distance}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name={getTransportationIcon(route.transportation)} size={16} color={colors.primary} />
            <Text style={styles.detailText}>{route.transportation}</Text>
          </View>
        </View>

        <View style={styles.routeInfo}>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Başlangıç Noktası</Text>
            <Text style={styles.infoValue}>{route.starting_point}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>En İyi Zaman</Text>
            <Text style={styles.infoValue}>{route.best_time}</Text>
          </View>
        </View>

        <View style={styles.stopsSection}>
          <Text style={styles.stopsTitle}>Duraklar ({route.stops.length})</Text>
          <View style={styles.stopsContainer}>
            {route.stops.slice(0, 3).map((stop, index) => (
              <View key={index} style={styles.stopItem}>
                <View style={styles.stopNumber}>
                  <Text style={styles.stopNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stopText}>{stop}</Text>
              </View>
            ))}
            {route.stops.length > 3 && (
              <Text style={styles.moreStops}>
                +{route.stops.length - 3} daha fazla durak
              </Text>
            )}
          </View>
        </View>

        <View style={styles.routeActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="directions" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Rotayı Başlat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="bookmark-border" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={styles.loadingText}>Gezi rotaları yükleniyor...</Text>
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
          <Icon name="directions" size={32} color={colors.white} />
          <Text style={styles.headerTitle}>Gezi Rotaları</Text>
          <Text style={styles.headerSubtitle}>
            Tire'yi keşfetmek için önerilen rotalar
          </Text>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipTitle}>💡 Gezi İpuçları</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• Rahat ayakkabı giyin</Text>
            <Text style={styles.tipText}>• Yanınızda su bulundurun</Text>
            <Text style={styles.tipText}>• Fotoğraf makinenizi unutmayın</Text>
            <Text style={styles.tipText}>• Yerel rehberlerden yardım alın</Text>
          </View>
        </View>

        <View style={styles.routesSection}>
          {routes.length > 0 ? (
            routes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="directions" size={64} color={colors.gray} />
              <Text style={styles.emptyStateText}>
                Gezi rotası bilgisi bulunamadı.
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
  tipsSection: {
    backgroundColor: '#E8F5E8',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  tipsList: {
    gap: 4,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  routesSection: {
    paddingHorizontal: 16,
  },
  routeCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...commonStyles.shadow,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  routeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  difficultyText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  routeDescription: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
    lineHeight: 22,
  },
  routeDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  routeInfo: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  infoSection: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  stopsSection: {
    marginBottom: 16,
  },
  stopsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  stopsContainer: {
    gap: 6,
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stopNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopNumberText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: 'bold',
  },
  stopText: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
  },
  moreStops: {
    fontSize: 12,
    color: colors.primary,
    fontStyle: 'italic',
    marginLeft: 28,
  },
  routeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionButtonText: {
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

export default TravelRoutesScreen; 