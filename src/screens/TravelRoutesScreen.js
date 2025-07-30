import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES, TABLE_COLUMNS } from '../config/supabase';

const TravelRoutesScreen = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      // Yeni rotalar tablosundan veri çek
      const { data, error } = await supabase
        .from(TABLES.ROTALAR)
        .select('*')
        .order(TABLE_COLUMNS.ROTALAR.ID, { ascending: true });

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

  // Yeni rotalar tablosu yapısına göre demo veriler
  const getDemoRoutes = () => [
    {
      id: 1,
      aciklama: 'Tire\'nin tarihi yerlerini keşfetmek için ideal rota',
      gezi_nok_id: 1,
      kategori: 'Tarihi Tur'
    },
    {
      id: 2,
      aciklama: 'El sanatları ve kültürel mekanları ziyaret etmek için özel rota',
      gezi_nok_id: 4,
      kategori: 'Kültür Turu'
    },
    {
      id: 3,
      aciklama: 'Tire\'nin doğal güzelliklerini keşfetmek için mükemmel rota',
      gezi_nok_id: 5,
      kategori: 'Doğa Turu'
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchRoutes();
  };

  const getCategoryInfo = (kategori) => {
    switch (kategori?.toLowerCase()) {
      case 'tarihi tur':
        return { text: 'Tarihi Tur', color: '#8B4513', icon: 'account-balance' };
      case 'kültür turu':
        return { text: 'Kültür Turu', color: '#FF6B35', icon: 'culture' };
      case 'doğa turu':
        return { text: 'Doğa Turu', color: '#4CAF50', icon: 'park' };
      default:
        return { text: 'Genel Tur', color: colors.primary, icon: 'directions' };
    }
  };

  const RouteCard = ({ route }) => {
    const category = getCategoryInfo(route.kategori);
    
    return (
      <TouchableOpacity style={styles.routeCard}>
        <View style={styles.routeHeader}>
          <Text style={styles.routeName}>{route.kategori}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: category.color }]}>
            <Icon name={category.icon} size={16} color={colors.white} />
            <Text style={styles.categoryText}>{category.text}</Text>
          </View>
        </View>

        <Text style={styles.routeDescription}>{route.aciklama}</Text>

        <View style={styles.routeDetails}>
          <View style={styles.detailRow}>
            <Icon name="directions" size={16} color={colors.primary} />
            <Text style={styles.detailText}>Rota #{route.id}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="place" size={16} color={colors.primary} />
            <Text style={styles.detailText}>Gezi Noktası #{route.gezi_nok_id}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="category" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{route.kategori}</Text>
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
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
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