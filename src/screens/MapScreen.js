import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  // Tire city center coordinates
  const tireCenter = {
    latitude: 38.0851,
    longitude: 27.7506,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const poi = [
    {
      id: 1,
      title: 'Tire Belediyesi',
      description: 'Tire Belediye Binası',
      latitude: 38.0851,
      longitude: 27.7506,
      type: 'government',
    },
    {
      id: 2,
      title: 'Tire Müzesi',
      description: 'Tarihi müze',
      latitude: 38.0845,
      longitude: 27.7500,
      type: 'museum',
    },
    {
      id: 3,
      title: 'Hacı Ömer Camii',
      description: 'Tarihi cami',
      latitude: 38.0855,
      longitude: 27.7510,
      type: 'mosque',
    },
    {
      id: 4,
      title: 'Tire Pazarı',
      description: 'Geleneksel pazar yeri',
      latitude: 38.0840,
      longitude: 27.7520,
      type: 'market',
    },
  ];

  useEffect(() => {
    // Request location permission and get current location
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      // Note: In real app, implement proper location permission request
      // For now, we'll use a default location
      setCurrentLocation(tireCenter);
      setMapReady(true);
    } catch (error) {
      console.error('Location permission error:', error);
      Alert.alert(
        'Konum Erişimi',
        'Konum hizmetlerine erişim izni verilmedi. Harita Tire merkezi gösterilecek.',
        [{ text: 'Tamam', onPress: () => setMapReady(true) }]
      );
    }
  };

  const getMarkerIcon = (type) => {
    switch (type) {
      case 'government': return 'business';
      case 'museum': return 'museum';
      case 'mosque': return 'place-of-worship';
      case 'market': return 'store';
      default: return 'place';
    }
  };

  const getMarkerColor = (type) => {
    switch (type) {
      case 'government': return colors.primary;
      case 'museum': return '#5E35B1';
      case 'mosque': return '#00ACC1';
      case 'market': return '#FB8C00';
      default: return colors.primary;
    }
  };

  const centerOnLocation = () => {
    if (currentLocation) {
      // In real app, this would center the map on user's location
      Alert.alert('Konum', 'Harita konumunuz üzerinde ortalandı.');
    } else {
      Alert.alert('Hata', 'Konum bilgisi alınamadı.');
    }
  };

  const showDirections = (destination) => {
    Alert.alert(
      'Yol Tarifi',
      `${destination.title} için yol tarifi almak istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Evet',
          onPress: () => {
            // In real app, open external maps app or show directions
            console.log('Directions to:', destination.title);
          }
        }
      ]
    );
  };

  if (!mapReady) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Icon name="map" size={64} color={colors.primary} />
        <Text style={styles.loadingText}>Harita yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      {/* Map Placeholder - In real app, use react-native-maps */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={64} color={colors.primary} />
          <Text style={styles.mapPlaceholderText}>
            Harita Görünümü
          </Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Tire Merkezi - {tireCenter.latitude.toFixed(4)}, {tireCenter.longitude.toFixed(4)}
          </Text>
        </View>

        {/* Floating Action Buttons */}
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab} onPress={centerOnLocation}>
            <Icon name="my-location" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Map Legend */}
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Harita Açıklaması</Text>
          {[
            { type: 'government', label: 'Belediye Binaları' },
            { type: 'museum', label: 'Müzeler' },
            { type: 'mosque', label: 'Camiler' },
            { type: 'market', label: 'Pazar Yerleri' },
          ].map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <Icon
                name={getMarkerIcon(item.type)}
                size={16}
                color={getMarkerColor(item.type)}
              />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Points of Interest List */}
      <View style={styles.poiContainer}>
        <Text style={styles.poiTitle}>Önemli Noktalar</Text>
        {poi.map((point) => (
          <TouchableOpacity
            key={point.id}
            style={styles.poiItem}
            onPress={() => showDirections(point)}
          >
            <View style={styles.poiIcon}>
              <Icon
                name={getMarkerIcon(point.type)}
                size={20}
                color={getMarkerColor(point.type)}
              />
            </View>
            <View style={styles.poiContent}>
              <Text style={styles.poiName}>{point.title}</Text>
              <Text style={styles.poiDescription}>{point.description}</Text>
            </View>
            <Icon name="directions" size={20} color={colors.primary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 2,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 12,
    marginBottom: 4,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  legendContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    ...commonStyles.shadow,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  legendText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  poiContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  poiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  poiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: colors.background,
  },
  poiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  poiContent: {
    flex: 1,
  },
  poiName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 2,
  },
  poiDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
  },
});

export default MapScreen; 