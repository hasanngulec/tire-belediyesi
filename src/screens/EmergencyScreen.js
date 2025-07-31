import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EmergencyScreen() {
  const emergencyCall = {
    message: "Yaşamsal tehlike varsa derhal 112'yi arayın",
    number: "112"
  };

  const services = [
    { name: "İtfaiye", number: "110", description: "Yangın, kaza ve acil kurtarma", icon: "local-fire-department", color: "#f44336" },
    { name: "Polis", number: "155", description: "Güvenlik ve asayiş olayları", icon: "local-police", color: "#2196F3" },
    { name: "Ambulans", number: "112", description: "Sağlık acil durumları", icon: "local-hospital", color: "#4CAF50" },
    { name: "Jandarma", number: "156", description: "Kırsal alan güvenliği", icon: "security", color: "#FF9800" }
  ];

  const municipal = [
    {
      title: "Belediye Acil",
      phone: "(0312) 555 0000",
      description: "Su kesintisi, elektrik arızası, yol sorunları",
      available: "7/24"
    },
    {
      title: "Su Arızası",
      phone: "(0312) 555 0001",
      description: "İçme suyu hattı acil müdahale",
      available: "7/24"
    }
  ];

  const handleEmergencyCall = (number, name) => {
    Alert.alert(
      'Acil Arama',
      `${name} (${number}) numarasını aramak istediğinizden emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Ara',
          onPress: () => Linking.openURL(`tel:${number}`),
          style: 'default',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Acil Durumlar</Text>
        <Text style={styles.headerSubtitle}>Acil durumlarda arayabileceğiniz numaralar</Text>
      </View>

      {/* Emergency Warning Card */}
      <View style={styles.warningCard}>
        <View style={styles.warningHeader}>
          <Text style={styles.warningTitle}>Acil Durum?</Text>
        </View>
        <Text style={styles.warningMessage}>{emergencyCall.message}</Text>
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => handleEmergencyCall(emergencyCall.number, "Acil Çağrı Merkezi")}
          activeOpacity={0.8}
        >
          <Text style={styles.emergencyButtonText}>112 - Acil Çağrı Merkezi</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Services Grid */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Acil Servisler</Text>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.serviceCard}
              onPress={() => handleEmergencyCall(service.number, service.name)}
              activeOpacity={0.7}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                <Icon name={service.icon} size={28} color="white" />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceNumber}>{service.number}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Municipal Emergency Services */}
      <View style={styles.municipalSection}>
        <Text style={styles.sectionTitle}>Belediye Acil Hizmetler</Text>
        {municipal.map((service, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.municipalCard}
            onPress={() => handleEmergencyCall(service.phone, service.title)}
            activeOpacity={0.7}
          >
            <View style={styles.municipalInfo}>
              <View style={styles.municipalHeader}>
                <Text style={styles.municipalTitle}>{service.title}</Text>
                <View style={styles.availableBadge}>
                  <Text style={styles.availableBadgeText}>{service.available}</Text>
                </View>
              </View>
              <Text style={styles.municipalPhone}>{service.phone}</Text>
              <Text style={styles.municipalDescription}>{service.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  warningCard: {
    backgroundColor: '#ffebee',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  warningHeader: {
    marginBottom: 12,
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f44336',
  },
  warningMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: 'white',
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 4,
  },
  serviceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  municipalSection: {
    padding: 16,
  },
  municipalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  municipalInfo: {
    flex: 1,
  },
  municipalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  municipalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
  },
  availableBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  municipalPhone: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
    marginBottom: 4,
  },
  municipalDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});