import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, RefreshControl, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES, TABLE_COLUMNS } from '../config/supabase';

const InfluencerRoutesScreen = ({ navigation }) => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async () => {
    try {
      // Yeni influencerlar tablosundan veri çek
      const { data, error } = await supabase
        .from(TABLES.INFLUENCERLAR)
        .select('*')
        .order(TABLE_COLUMNS.INFLUENCERLAR.AD, { ascending: true });

      if (error) {
        console.error('Error fetching influencers:', error);
        setInfluencers(getDemoInfluencers());
      } else {
        setInfluencers(data || getDemoInfluencers());
      }
    } catch (error) {
      console.error('Error:', error);
      setInfluencers(getDemoInfluencers());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getDemoInfluencers = () => [
    {
      id: 1,
      ad: 'Tire Gezgin',
      aciklama: 'Tire\'nin gizli kalmış güzelliklerini keşfeden seyahat blogcusu',
      fotograf: null,
      instagram_linki: 'https://instagram.com/tiregezgin',
      rota_id: 1
    },
    {
      id: 2,
      ad: 'Kültür Avcısı',
      aciklama: 'Tire\'nin tarihi ve kültürel mirasını tanıtan içerik üreticisi',
      fotograf: null,
      instagram_linki: 'https://instagram.com/kulturavcisi',
      rota_id: 2
    },
    {
      id: 3,
      ad: 'Doğa Rehberi',
      aciklama: 'Tire\'nin doğal güzelliklerini ve yürüyüş rotalarını paylaşan doğa tutkunu',
      fotograf: null,
      instagram_linki: 'https://instagram.com/dogarehberi',
      rota_id: 3
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchInfluencers();
  };

  const openInstagram = (instagramLink) => {
    if (instagramLink) {
      Linking.openURL(instagramLink);
    }
  };

  const InfluencerCard = ({ influencer }) => (
    <TouchableOpacity style={styles.influencerCard}>
      <View style={styles.influencerImageContainer}>
        {influencer.fotograf ? (
          <Image source={{ uri: influencer.fotograf }} style={styles.influencerImage} />
        ) : (
          <View style={styles.influencerImagePlaceholder}>
            <Icon name="person" size={40} color={colors.primary} />
          </View>
        )}
      </View>
      
      <View style={styles.influencerContent}>
        <Text style={styles.influencerName}>{influencer.ad}</Text>
        <Text style={styles.influencerDescription} numberOfLines={3}>
          {influencer.aciklama}
        </Text>
        
        <View style={styles.influencerDetails}>
          <View style={styles.detailRow}>
            <Icon name="route" size={16} color={colors.primary} />
            <Text style={styles.detailText}>Rota #{influencer.rota_id}</Text>
          </View>
          
          {influencer.instagram_linki && (
            <TouchableOpacity 
              style={styles.instagramButton}
              onPress={() => openInstagram(influencer.instagram_linki)}
            >
              <Icon name="camera-alt" size={16} color={colors.white} />
              <Text style={styles.instagramButtonText}>Instagram</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={styles.loadingText}>Influencer rotaları yükleniyor...</Text>
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
          <Icon name="star" size={32} color={colors.white} />
          <Text style={styles.headerTitle}>Influencer Rotaları</Text>
          <Text style={styles.headerSubtitle}>
            Tire'yi farklı gözlerle keşfedin
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🌟 Özel Deneyimler</Text>
          <Text style={styles.infoText}>
            Tire'nin yerel influencerları tarafından hazırlanan özel rotalar ve deneyimler
          </Text>
        </View>

        <View style={styles.influencersSection}>
          {influencers.length > 0 ? (
            influencers.map((influencer) => (
              <InfluencerCard key={influencer.id} influencer={influencer} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="star" size={64} color={colors.gray} />
              <Text style={styles.emptyStateText}>
                Influencer rotası bilgisi bulunamadı.
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
    backgroundColor: colors.secondary,
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
  infoSection: {
    padding: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  influencersSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  influencerCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  influencerImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  influencerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  influencerImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  influencerContent: {
    flex: 1,
  },
  influencerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  influencerDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  influencerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  instagramButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  instagramButtonText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});

export default InfluencerRoutesScreen; 