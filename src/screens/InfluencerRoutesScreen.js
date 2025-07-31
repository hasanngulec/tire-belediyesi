import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InfluencerRoutesScreen = () => {
  const data = {
    influencer: {
      name: "Gezgin Ayşe",
      username: "@gezginayse",
      followers: "125K takipçi",
      category: "Tarih ve Kültür",
      image: "https://via.placeholder.com/100",
      isFollowing: false
    },
    route: {
      title: "Tarihi Dokular Rotası",
      description: "Şehrimizin en güzel tarihi mekanlarını keşfedin",
      duration: "4-5 saat",
      distance: "3.2 km",
      difficulty: "Orta",
      rating: 4.8,
      highlights: [
        "Tarihi Ulu Cami'nin gizli detayları",
        "Geleneksel Çarşı'da fotoğraf noktaları",
        "Antik Kale'den panoramik manzara",
        "Tarihi Hamam'ın mimari güzellikleri"
      ],
      tips: [
        "Sabah erken saatlerde başlayın, ışık daha güzel",
        "Tarihi Hamam'da rehberli tur mutlaka alın",
        "Çarşı'da yerel ustalarla sohbet etmeyi unutmayın"
      ]
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? "star" : "star-border"}
          size={16}
          color={i <= rating ? "#FFD700" : "#ccc"}
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Influencer Rotaları</Text>
        <Text style={styles.headerSubtitle}>Popüler içerik üreticilerinin önerdiği rotalar</Text>
      </View>

      {/* Tips Card */}
      <View style={styles.tipsCard}>
        <Icon name="star" size={24} color="#9C27B0" />
        <Text style={styles.tipsText}>Her influencer'ın kendi deneyimlerine dayalı özel tavsiyeleri var...</Text>
      </View>

      {/* Influencer Profile */}
      <View style={styles.influencerCard}>
        <View style={styles.profileSection}>
          <Image source={{ uri: data.influencer.image }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.influencerName}>{data.influencer.name}</Text>
            <Text style={styles.username}>{data.influencer.username}</Text>
            <Text style={styles.followers}>{data.influencer.followers}</Text>
            <View style={styles.categoryChip}>
              <Text style={styles.categoryText}>{data.influencer.category}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Takip Et</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Route Details */}
      <View style={styles.routeCard}>
        <Text style={styles.routeTitle}>{data.route.title}</Text>
        <Text style={styles.routeDescription}>{data.route.description}</Text>
        
        <View style={styles.routeInfo}>
          <Text style={styles.routeDuration}>{data.route.duration} • {data.route.distance}</Text>
          <View style={styles.difficultyChip}>
            <Text style={styles.difficultyText}>{data.route.difficulty}</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(data.route.rating)}
          </View>
          <Text style={styles.ratingText}>{data.route.rating}</Text>
        </View>

        {/* Highlights */}
        <View style={styles.highlightsSection}>
          <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
          {data.route.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <Icon name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>{data.influencer.name}'in Tavsiyeleri</Text>
          {data.route.tips.map((tip, index) => (
            <View key={index} style={styles.tipBox}>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Start Route Button */}
        <TouchableOpacity style={styles.startRouteButton}>
          <Text style={styles.startRouteButtonText}>Rotayı Başlat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  tipsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 20,
    backgroundColor: '#f3e5f5',
    borderRadius: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#9C27B0',
    marginLeft: 8,
  },
  influencerCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  influencerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5266',
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  followers: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  followButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  followButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  routeCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  routeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 8,
  },
  routeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeDuration: {
    fontSize: 14,
    color: '#666',
  },
  difficultyChip: {
    backgroundColor: '#FFC107',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
  },
  highlightsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  tipsSection: {
    marginBottom: 20,
  },
  tipBox: {
    backgroundColor: '#f3e5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#9C27B0',
  },
  startRouteButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startRouteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InfluencerRoutesScreen; 