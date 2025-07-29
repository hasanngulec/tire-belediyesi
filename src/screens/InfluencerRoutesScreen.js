import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const InfluencerRoutesScreen = () => {
  const influencerRoutes = [
    {
      id: 1,
      influencer: 'Gezgin Ayşe',
      title: 'Instagrammable Tire Turu',
      description: 'En fotojenik kareler için özel rota',
      duration: '3-4 saat',
      difficulty: 'Kolay',
      highlights: [
        'Tarihi belediye binası önünde klasik fotoğraf',
        'Tire pazarında renkli tezgahlar',
        'Eski sokakların nostaljik atmosferi',
        'Sunset için en iyi nokta - Seyir Terası'
      ],
      tips: [
        'Sabah erken saatlerde daha az kalabalık',
        'Altın saat (golden hour) için akşam 17:00-18:30',
        'Portre lensi tavsiye edilir'
      ],
      instagram: '@gezginayse',
      followerCount: '125K',
      avatar: null,
    },
    {
      id: 2,
      influencer: 'Tarih Severler',
      title: 'Osmanlı İzleri Rotası',
      description: 'Tarihi yapıları sosyal medyada paylaşmak isteyenler için',
      duration: '2-3 saat',
      difficulty: 'Orta',
      highlights: [
        'Hacı Ömer Camii\'nin muhteşem mimarisi',
        'Eski belediye binası detay çekimleri',
        'Tarihi çeşmeler ve sokak arası görünümler',
        'Geleneksel el sanatları atölyeleri'
      ],
      tips: [
        'Tarihi bilgileri önceden araştırın',
        'Hikaye anlatımı için video çekin',
        'Yerel rehberlerle iletişime geçin'
      ],
      instagram: '@tarihseverler',
      followerCount: '89K',
      avatar: null,
    },
    {
      id: 3,
      influencer: 'Lezzet Avcısı',
      title: 'Tire Lezzetleri Turu',
      description: 'Food bloggerlar için özel gastronomi rotası',
      duration: '4-5 saat',
      difficulty: 'Kolay',
      highlights: [
        'Geleneksel Tire lokumu atölyesi',
        'Yerel restoranlarda otantik lezzetler',
        'Ev yapımı reçel ve turşu dükkanları',
        'Köy kahvaltısı deneyimi'
      ],
      tips: [
        'Aç karnına başlamayın, çok çeşit var!',
        'Malzeme listelerini not alın',
        'Video story için kısa kliplere odaklanın'
      ],
      instagram: '@lezzetavcisi',
      followerCount: '67K',
      avatar: null,
    },
    {
      id: 4,
      influencer: 'Doğa Tutkunları',
      title: 'Tire Doğa Kaçamağı',
      description: 'Doğa severlerin favorisi manzara rotası',
      duration: '5-6 saat',
      difficulty: 'Zor',
      highlights: [
        'Millet Bahçesi\'nden şehir manzarası',
        'Doğa yürüyüş parkurundan orman görünümleri',
        'Drone çekimleri için geniş alanlar',
        'Gün batımı için tepeler'
      ],
      tips: [
        'Spor ayakkabı ve su şişesi şart',
        'Drone için gerekli izinleri alın',
        'Hava koşullarını takip edin'
      ],
      instagram: '@dogatatkunlari',
      followerCount: '134K',
      avatar: null,
    },
  ];

  const getInfluencerIcon = (influencer) => {
    if (influencer.includes('Ayşe')) return 'photo-camera';
    if (influencer.includes('Tarih')) return 'account-balance';
    if (influencer.includes('Lezzet')) return 'restaurant';
    if (influencer.includes('Doğa')) return 'nature';
    return 'star';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Kolay': return '#4CAF50';
      case 'Orta': return '#FF9800';
      case 'Zor': return '#F44336';
      default: return colors.gray;
    }
  };

  const InfluencerCard = ({ route }) => (
    <View style={styles.routeCard}>
      <View style={styles.routeHeader}>
        <View style={styles.influencerInfo}>
          <View style={styles.avatarContainer}>
            <Icon name={getInfluencerIcon(route.influencer)} size={24} color={colors.primary} />
          </View>
          <View style={styles.influencerDetails}>
            <Text style={styles.influencerName}>{route.influencer}</Text>
            <View style={styles.socialInfo}>
              <Text style={styles.instagramHandle}>{route.instagram}</Text>
              <Text style={styles.followerCount}>{route.followerCount} takipçi</Text>
            </View>
          </View>
        </View>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(route.difficulty) }]}>
          <Text style={styles.difficultyText}>{route.difficulty}</Text>
        </View>
      </View>

      <View style={styles.routeContent}>
        <Text style={styles.routeTitle}>{route.title}</Text>
        <Text style={styles.routeDescription}>{route.description}</Text>

        <View style={styles.routeDetails}>
          <View style={styles.detailItem}>
            <Icon name="access-time" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{route.duration}</Text>
          </View>
        </View>

        <View style={styles.highlightsSection}>
          <Text style={styles.sectionTitle}>✨ Öne Çıkanlar</Text>
          {route.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <Icon name="camera-alt" size={14} color={colors.accent} />
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>💡 İpuçları</Text>
          {route.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Icon name="lightbulb-outline" size={14} color={colors.info} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.followButton}>
            <Icon name="person-add" size={16} color={colors.white} />
            <Text style={styles.followButtonText}>Takip Et</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share" size={16} color={colors.primary} />
            <Text style={styles.shareButtonText}>Paylaş</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton}>
            <Icon name="bookmark-border" size={16} color={colors.primary} />
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Icon name="star" size={32} color={colors.white} />
          <Text style={styles.headerTitle}>Influencer Rota Önerileri</Text>
          <Text style={styles.headerSubtitle}>
            Sosyal medya fenomenlerinden özel rota tavsiyeleri
          </Text>
        </View>

        <View style={styles.introSection}>
          <View style={styles.introCard}>
            <Icon name="info" size={24} color={colors.info} />
            <View style={styles.introText}>
              <Text style={styles.introTitle}>Özel İçerik Rotaları</Text>
              <Text style={styles.introDescription}>
                Popüler influencerların deneyimledikleri ve takipçileriyle paylaştıkları 
                özel rotalar. Her rota farklı tema ve fotoğraf tarzına odaklanıyor.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.routesSection}>
          {influencerRoutes.map((route) => (
            <InfluencerCard key={route.id} route={route} />
          ))}
        </View>

        <View style={styles.socialTipsSection}>
          <Text style={styles.sectionTitle}>📱 Sosyal Medya İpuçları</Text>
          
          <View style={styles.socialTipCard}>
            <Icon name="camera" size={20} color={colors.primary} />
            <Text style={styles.socialTipText}>
              En iyi fotoğraflar için sabah 08:00-10:00 ve akşam 17:00-19:00 saatleri ideal.
            </Text>
          </View>

          <View style={styles.socialTipCard}>
            <Icon name="tag" size={20} color={colors.accent} />
            <Text style={styles.socialTipText}>
              #Tire #TireBelediyesi #İzmir #GezilecekyerlerTürkiye hashtaglerini kullanın.
            </Text>
          </View>

          <View style={styles.socialTipCard}>
            <Icon name="people" size={20} color={colors.success} />
            <Text style={styles.socialTipText}>
              Yerel işletmeleri etiketleyerek onlara da destek olabilirsiniz.
            </Text>
          </View>

          <View style={styles.socialTipCard}>
            <Icon name="location-on" size={20} color={colors.error} />
            <Text style={styles.socialTipText}>
              Konum paylaşımı yaparken hassas alanlara dikkat edin.
            </Text>
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
  introSection: {
    padding: 16,
  },
  introCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...commonStyles.shadow,
  },
  introText: {
    marginLeft: 12,
    flex: 1,
  },
  introTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  introDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  routesSection: {
    paddingHorizontal: 16,
  },
  routeCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...commonStyles.shadow,
  },
  routeHeader: {
    padding: 16,
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  influencerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  influencerDetails: {
    flex: 1,
  },
  influencerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  socialInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  instagramHandle: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  followerCount: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  routeContent: {
    padding: 16,
  },
  routeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  routeDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  routeDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  highlightsSection: {
    marginBottom: 16,
  },
  tipsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  highlightText: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 18,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  followButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  followButtonText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
  },
  shareButton: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shareButtonText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  saveButtonText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  socialTipsSection: {
    padding: 16,
    paddingBottom: 32,
  },
  socialTipCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...commonStyles.shadow,
  },
  socialTipText: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
});

export default InfluencerRoutesScreen; 