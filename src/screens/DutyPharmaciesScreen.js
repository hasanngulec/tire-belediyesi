import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DutyPharmaciesScreen = () => {
  const data = {
    dutyPharmacy: {
      name: "Şifa Eczanesi",
      address: "İstiklal Caddesi No:45 Merkez",
      status: "Acil",
      open24h: true
    },
    pharmacies: [
      {
        name: "Sağlık Eczanesi",
        address: "Atatürk Caddesi No:15 Merkez",
        distance: "0.8 km",
        hours: "08:00 - 22:00",
        services: ["Reçeteli İlaç", "Vitamin", "Kozmetik", "Bebek Ürünleri"],
        status: "Açık"
      },
      {
        name: "Merkez Eczanesi",
        address: "Cumhuriyet Mahallesi Çarşı İçi No:3",
        distance: "1.2 km",
        hours: "09:00 - 21:00",
        services: ["Reçeteli İlaç", "Homeopati", "Medikal Cihaz"],
        status: "Açık"
      },
      {
        name: "Aile Eczanesi",
        address: "Bahçelievler Mahallesi Barış Caddesi No:27",
        distance: "2.1 km",
        status: "Kapalı"
      }
    ]
  };

  const renderDutyPharmacy = () => (
    <View style={styles.dutyPharmacyCard}>
      <View style={styles.dutyPharmacyHeader}>
        <Text style={styles.dutyPharmacyTitle}>Nöbetçi Eczane (Bugün)</Text>
        <View style={styles.acilChip}>
          <Text style={styles.acilChipText}>Acil</Text>
        </View>
      </View>
      <Text style={styles.pharmacyName}>{data.dutyPharmacy.name}</Text>
      <Text style={styles.pharmacyAddress}>{data.dutyPharmacy.address}</Text>
      <Text style={styles.open24h}>24 Saat Açık</Text>
      <View style={styles.dutyPharmacyButtons}>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>Ara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.directionsButton}>
          <Text style={styles.directionsButtonText}>Yol Tarifi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPharmacyCard = ({ item }) => (
    <View style={styles.pharmacyCard}>
      <View style={styles.pharmacyHeader}>
        <Text style={styles.pharmacyName}>{item.name}</Text>
        <View style={[styles.statusChip, { backgroundColor: item.status === 'Açık' ? '#4CAF50' : '#9E9E9E' }]}>
          <Text style={styles.statusChipText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.pharmacyAddress}>{item.address}</Text>
      <Text style={styles.pharmacyDistance}>{item.distance}</Text>
      {item.hours && <Text style={styles.pharmacyHours}>{item.hours}</Text>}
      {item.services && (
        <View style={styles.servicesContainer}>
          {item.services.map((service, index) => (
            <Text key={index} style={styles.serviceChip}>{service}</Text>
          ))}
        </View>
      )}
      <View style={styles.pharmacyButtons}>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>Ara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.directionsButton}>
          <Text style={styles.directionsButtonText}>Yol Tarifi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.pharmacies}
        renderItem={renderPharmacyCard}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={renderDutyPharmacy}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 16,
  },
  dutyPharmacyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dutyPharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dutyPharmacyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5266',
  },
  acilChip: {
    backgroundColor: '#f44336',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  acilChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 4,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pharmacyDistance: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  pharmacyHours: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  open24h: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  serviceChip: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    color: '#1976D2',
    marginRight: 8,
    marginBottom: 8,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pharmacyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dutyPharmacyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pharmacyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  callButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  directionsButton: {
    borderColor: '#9E9E9E',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  directionsButtonText: {
    color: '#9E9E9E',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DutyPharmaciesScreen;