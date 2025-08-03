import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { supabase } from '../config/supabase';

const { width } = Dimensions.get('window');

const TourismScreen = ({ navigation }) => {
  const [geziNoktalari, setGeziNoktalari] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('tarihi');

  const categories = [
    { id: 'tarihi', name: 'Tarihi', icon: 'account-balance', color: '#8B4513' },
    { id: 'kültürel', name: 'Kültürel', icon: 'palette', color: '#FF6B35' },
    { id: 'yeme-içme', name: 'Yeme-İçme', icon: 'restaurant', color: '#4CAF50' },
  ];

  useEffect(() => {
    fetchGeziNoktalari();
  }, []);

  const fetchGeziNoktalari = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gezi_noktalari')
        .select('*')
        .order('ad', { ascending: true });

      if (error) {
        console.error('Gezi noktaları yüklenirken hata:', error);
        setGeziNoktalari(getDemoData());
      } else {
        setGeziNoktalari(data || getDemoData());
      }
    } catch (error) {
      console.error('Beklenmeyen hata:', error);
      setGeziNoktalari(getDemoData());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getDemoData = () => [
    {
      id: 1,
      ad: 'deneme',
      aciklama: 'den',
      kategori: 'tarihi',
      enlem: 38.0897,
      boylam: 27.7358,
      fotograf: null,
      acilis_saati: '09:00',
      kapanis_saati: '17:00',
      telefon_numarasi: '20',
      adres: 'te'
    },
    {
      id: 2,
      ad: 'Tire Müzesi',
      aciklama: 'Tire\'nin tarihi ve kültürel mirasını sergileyen müze',
      kategori: 'kültürel',
      enlem: 38.0895,
      boylam: 27.7360,
      fotograf: null,
      acilis_saati: '09:00',
      kapanis_saati: '17:00',
      telefon_numarasi: null,
      adres: 'Tire Merkez'
    },
    {
      id: 3,
      ad: 'Tire Lokum Evi',
      aciklama: 'Geleneksel Tire lokumu üretim ve satış yeri',
      kategori: 'yeme-içme',
      enlem: 38.0892,
      boylam: 27.7355,
      fotograf: null,
      acilis_saati: '08:00',
      kapanis_saati: '20:00',
      telefon_numarasi: null,
      adres: 'Tire Merkez'
    }
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchGeziNoktalari();
  };

  const filteredGeziNoktalari = geziNoktalari.filter(
    nokta => nokta.kategori === selectedCategory
  );

  const onSpotPress = (spot) => {
    navigation.navigate('TourismSpotDetail', { spot });
  };

  const getCategoryColor = (kategori) => {
    const category = categories.find(cat => cat.id === kategori);
    return category ? category.color : '#2E5266';
  };

  const renderSpotCard = ({ item }) => (
    <TouchableOpacity
      style={styles.spotCard}
      onPress={() => onSpotPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.spotHeader}>
          <Text style={styles.spotTitle}>{item.ad}</Text>
          <View style={[styles.categoryChip, { backgroundColor: getCategoryColor(item.kategori) }]}>
            <Text style={styles.categoryChipText}>{item.kategori}</Text>
          </View>
        </View>
        
        <Text style={styles.spotDescription} numberOfLines={2}>
          {item.aciklama}
        </Text>
        
        {item.adres && (
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={16} color="#666" />
            <Text style={styles.locationText}>{item.adres}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.arrowContainer}>
        <Icon name="chevron-right" size={24} color="#2E5266" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Category Tabs */}
      <View style={styles.categoryTabsContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.activeTab
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon 
              name={category.icon} 
              size={18} 
              color={selectedCategory === category.id ? '#1976D2' : '#666'} 
            />
            <Text 
              style={[
                styles.categoryTabText,
                selectedCategory === category.id && styles.activeTabText
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Spots List */}
      <FlatList
        data={filteredGeziNoktalari}
        renderItem={renderSpotCard}
        keyExtractor={(item) => item.id.toString()}
        style={styles.spotsList}
        contentContainerStyle={styles.spotsListContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5266',
  },
  categoryTabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1976D2',
  },
  categoryTabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  spotsList: {
    flex: 1,
  },
  spotsListContent: {
    padding: 16,
  },
  spotCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardContent: {
    flex: 1,
  },
  spotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spotTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
    flex: 1,
  },
  categoryChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  categoryChipText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize',
  },
  spotDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  arrowContainer: {
    marginLeft: 12,
    padding: 4,
  },
  separator: {
    height: 12,
  },
});

export default TourismScreen;