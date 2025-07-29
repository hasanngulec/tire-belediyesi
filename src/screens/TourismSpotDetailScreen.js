import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const TourismSpotDetailScreen = ({ route }) => {
  const { spot } = route.params;

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

  const openMaps = () => {
    const query = `${spot.name}, ${spot.location}, Tire, İzmir`;
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(query)}`;
    Linking.openURL(url);
  };

  const shareSpot = () => {
    // In real app, implement sharing functionality
    console.log('Share spot:', spot.name);
  };

  const features = [
    { label: 'Kategori', value: spot.category, icon: getCategoryIcon(spot.category) },
    { label: 'Ziyaret Süresi', value: spot.visit_duration, icon: 'access-time' },
    { label: 'Giriş Ücreti', value: spot.entrance_fee, icon: 'attach-money' },
    { label: 'Değerlendirme', value: `${spot.rating}/5`, icon: 'star' },
  ];

  const additionalInfo = [
    {
      title: 'Ziyaret Saatleri',
      content: spot.visiting_hours || 'Günlük 09:00 - 17:00 (Genel ziyaret saatleri)',
      icon: 'schedule',
    },
    {
      title: 'Ulaşım',
      content: spot.transportation || 'Tire merkeze yakın konumda, yürüyerek veya özel araçla ulaşılabilir.',
      icon: 'directions',
    },
    {
      title: 'Özellikler',
      content: spot.features || 'Tarihi ve kültürel öneme sahip, fotoğraf çekimi için uygun.',
      icon: 'info',
    },
  ];

  return (
    <View style={commonStyles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          {spot.image_url ? (
            <Image source={{ uri: spot.image_url }} style={styles.spotImage} />
          ) : (
            <View style={[styles.spotImagePlaceholder, { backgroundColor: getCategoryColor(spot.category) + '20' }]}>
              <Icon name={getCategoryIcon(spot.category)} size={80} color={getCategoryColor(spot.category)} />
            </View>
          )}
          
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(spot.category) }]}>
            <Icon name={getCategoryIcon(spot.category)} size={16} color={colors.white} />
            <Text style={styles.categoryText}>{spot.category}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{spot.name}</Text>
            <View style={styles.locationRow}>
              <Icon name="place" size={20} color={colors.primary} />
              <Text style={styles.locationText}>{spot.location}</Text>
            </View>
          </View>

          <View style={styles.ratingSection}>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="star"
                  size={20}
                  color={star <= Math.floor(spot.rating) ? '#FFD700' : colors.lightGray}
                />
              ))}
              <Text style={styles.ratingText}>{spot.rating}/5</Text>
            </View>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Özellikler</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <Icon name={feature.icon} size={24} color={colors.primary} />
                  <Text style={styles.featureLabel}>{feature.label}</Text>
                  <Text style={styles.featureValue}>{feature.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Açıklama</Text>
            <Text style={styles.description}>{spot.description}</Text>
          </View>

          {spot.detailed_description && (
            <View style={styles.detailedDescriptionSection}>
              <Text style={styles.sectionTitle}>Detaylı Bilgi</Text>
              <Text style={styles.description}>{spot.detailed_description}</Text>
            </View>
          )}

          <View style={styles.additionalInfoSection}>
            <Text style={styles.sectionTitle}>Ek Bilgiler</Text>
            {additionalInfo.map((info, index) => (
              <View key={index} style={styles.infoCard}>
                <Icon name={info.icon} size={24} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>{info.title}</Text>
                  <Text style={styles.infoText}>{info.content}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={openMaps}>
              <Icon name="directions" size={20} color={colors.white} />
              <Text style={styles.primaryButtonText}>Yol Tarifi Al</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={shareSpot}>
              <Icon name="share" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Paylaş</Text>
            </TouchableOpacity>
          </View>

          {spot.gallery && spot.gallery.length > 0 && (
            <View style={styles.gallerySection}>
              <Text style={styles.sectionTitle}>Fotoğraf Galerisi</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.galleryContainer}>
                  {spot.gallery.map((imageUrl, index) => (
                    <Image key={index} source={{ uri: imageUrl }} style={styles.galleryImage} />
                  ))}
                </View>
              </ScrollView>
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
  imageContainer: {
    height: 250,
    position: 'relative',
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
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  ratingSection: {
    marginBottom: 24,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  featuresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  featureLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  featureValue: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  detailedDescriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
    textAlign: 'justify',
  },
  additionalInfoSection: {
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    ...commonStyles.shadow,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  gallerySection: {
    marginBottom: 24,
  },
  galleryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  galleryImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

export default TourismSpotDetailScreen; 