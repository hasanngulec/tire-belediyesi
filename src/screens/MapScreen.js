import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { supabase } from '../config/supabase';

export default function MapScreen({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Tire merkez koordinatları
  const initialRegion = {
    latitude: 38.0931,
    longitude: 27.7519,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const categories = [
    { id: 'all', name: 'Tümü', color: '#2E5266', icon: 'place' },
    { id: 'tarihi', name: 'Tarihi', color: '#8B4513', icon: 'account-balance' },
    { id: 'kültürel', name: 'Kültürel', color: '#9C27B0', icon: 'palette' },
    { id: 'yeme-içme', name: 'Yeme-İçme', color: '#FF5722', icon: 'restaurant' },
  ];

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('gezi_noktalari')
        .select('*');

      if (error) {
        console.error('Gezi noktaları alınırken hata:', error);
        Alert.alert('Hata', 'Harita verileri yüklenemedi');
        return;
      }

      setPlaces(data || []);
    } catch (error) {
      console.error('Harita fetch hatası:', error);
      Alert.alert('Hata', 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (category) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.color : '#2E5266';
  };

  const getFilteredPlaces = () => {
    if (selectedCategory === 'all') {
      return places;
    }
    return places.filter(place => place.kategori === selectedCategory);
  };

  const handleMarkerPress = (place) => {
    Alert.alert(
      place.ad,
      place.aciklama,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Detayları Gör',
          onPress: () => navigation.navigate('Tourism', {
            screen: 'TourismSpotDetail',
            params: { spot: place }
          }),
        },
      ]
    );
  };

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        {
          backgroundColor: selectedCategory === category.id ? category.color : 'white',
          borderColor: category.color,
        }
      ]}
      onPress={() => setSelectedCategory(category.id)}
      activeOpacity={0.8}
    >
      <Icon
        name={category.icon}
        size={16}
        color={selectedCategory === category.id ? 'white' : category.color}
      />
      <Text
        style={[
          styles.categoryButtonText,
          {
            color: selectedCategory === category.id ? 'white' : category.color,
          }
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E5266" />
        <Text style={styles.loadingText}>Harita yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Kategori Filtreleri */}
      <View style={styles.categoryContainer}>
        <View style={styles.categoryScroll}>
          {categories.map(renderCategoryButton)}
        </View>
      </View>

      {/* Harita */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {getFilteredPlaces().map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: parseFloat(place.enlem),
              longitude: parseFloat(place.boylam),
            }}
            title={place.ad}
            description={place.aciklama}
            onPress={() => handleMarkerPress(place)}
            pinColor={getMarkerColor(place.kategori)}
          />
        ))}
      </MapView>

      {/* Alt Bilgi Paneli */}
      <View style={styles.infoPanel}>
        <View style={styles.infoPanelContent}>
          <Icon name="info" size={20} color="#2E5266" />
          <Text style={styles.infoPanelText}>
            {getFilteredPlaces().length} konum gösteriliyor
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchPlaces}
          activeOpacity={0.8}
        >
          <Icon name="refresh" size={20} color="#2E5266" />
        </TouchableOpacity>
      </View>

      {/* Kategori Açıklaması */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Kategori Renkleri:</Text>
        <View style={styles.legendItems}>
          {categories.slice(1).map((category) => (
            <View key={category.id} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: category.color }
                ]}
              />
              <Text style={styles.legendText}>{category.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  categoryContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  categoryScroll: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 2,
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  map: {
    flex: 1,
  },
  infoPanel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoPanelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoPanelText: {
    fontSize: 14,
    color: '#2E5266',
    fontWeight: '600',
    marginLeft: 8,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
  },
  legendContainer: {
    position: 'absolute',
    top: 80,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 8,
  },
  legendItems: {
    gap: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#666',
  },
});


