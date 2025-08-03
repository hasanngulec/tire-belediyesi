import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TravelRoutesScreen = ({ navigation }) => {
  const routes = [
    {
      name: "Tarihi Tur Rotası",
      description: "Şehrimizin tarihi yerlerini keşfedin",
      duration: "3-4 saat",
      distance: "2.5 km",
      difficulty: "Kolay",
      stops: ["Tarihi Ulu Cami", "Antik Kale", "Tarihi Hamam"],
      color: "#f44336"
    },
    {
      name: "Kültür ve Sanat Rotası",
      description: "Kültürel mekanları ziyaret edin",
      duration: "2-3 saat",
      distance: "1.8 km",
      difficulty: "Kolay",
      stops: ["Kültür Merkezi", "Sanat Galerisi", "Amfi Tiyatro"],
      color: "#3f51b5"
    },
    {
      name: "Lezzet Rotası",
      description: "Yerel lezzetleri tadın",
      duration: "4-5 saat",
      distance: "3.2 km",
      difficulty: "Orta",
      stops: ["Yerel Lezzet Evi", "Tatlı Dükkanı", "Pazar Yeri"],
      color: "#4caf50"
    }
  ];

  const renderRouteCard = ({ item }) => (
    <View style={styles.routeCard}>
      <Text style={styles.routeName}>{item.name}</Text>
      <Text style={styles.routeDescription}>{item.description}</Text>

      <View style={styles.stopsContainer}>
        {item.stops.map((stop, index) => (
          <Text key={index} style={styles.stopChip}>{stop}</Text>
        ))}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={() => navigation.navigate('Map', {
            spot: {
              ad: item.name,
              aciklama: item.description,
              enlem: 38.0931, // İlk durağın koordinatları
              boylam: 27.7519,
              kategori: 'rota'
            }
          })}
        >
          <Text style={styles.mapButtonText}>Rotaya Git</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gezi Rotaları</Text>
        <Text style={styles.headerSubtitle}>Şehrimizi keşfetmek için önerilen rotalar</Text>
      </View>

      {/* Tips Box */}
      <View style={styles.tipsBox}>
        <Icon name="lightbulb" size={24} color="#1976D2" />
        <Text style={styles.tipsText}>Rotaları takip ederken rahat ayakkabı giyin ve su şişenizi yanınıza alın.</Text>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        renderItem={renderRouteCard}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.routesList}
      />
    </View>
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
  tipsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 20,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#1976D2',
    marginLeft: 8,
  },
  routesList: {
    padding: 20,
  },
  routeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 8,
  },
  routeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  routeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  routeInfo: {
    fontSize: 12,
    color: '#999',
  },
  stopsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  stopChip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    color: '#666',
    marginRight: 8,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  mapButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  guideButton: {
    borderColor: '#1976D2',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  guideButtonText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TravelRoutesScreen; 