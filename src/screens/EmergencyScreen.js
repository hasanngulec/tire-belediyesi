import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES } from '../config/supabase';

const EmergencyScreen = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencyContacts();
  }, []);

  const fetchEmergencyContacts = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.EMERGENCY_CONTACTS)
        .select('*')
        .order('priority', { ascending: true });

      if (error) {
        console.error('Error fetching emergency contacts:', error);
        setEmergencyContacts(getDemoEmergencyContacts());
      } else {
        setEmergencyContacts(data || getDemoEmergencyContacts());
      }
    } catch (error) {
      console.error('Error:', error);
      setEmergencyContacts(getDemoEmergencyContacts());
    } finally {
      setLoading(false);
    }
  };

  const getDemoEmergencyContacts = () => [
    {
      id: 1,
      title: 'Polis İmdat',
      phone: '155',
      description: '24 saat acil polis yardımı',
      icon: 'local-police',
      color: '#1976D2',
      priority: 1,
    },
    {
      id: 2,
      title: 'İtfaiye',
      phone: '110',
      description: 'Yangın ve kurtarma hizmetleri',
      icon: 'local-fire-department',
      color: '#D32F2F',
      priority: 2,
    },
    {
      id: 3,
      title: 'Ambulans',
      phone: '112',
      description: 'Acil sağlık hizmetleri',
      icon: 'local-hospital',
      color: '#388E3C',
      priority: 3,
    },
    {
      id: 4,
      title: 'Jandarma',
      phone: '156',
      description: 'Kırsal alan güvenlik',
      icon: 'security',
      color: '#7B1FA2',
      priority: 4,
    },
    {
      id: 5,
      title: 'AFAD',
      phone: '122',
      description: 'Afet ve acil durum yönetimi',
      icon: 'warning',
      color: '#F57C00',
      priority: 5,
    },
    {
      id: 6,
      title: 'Tire Belediyesi',
      phone: '0232 512 60 20',
      description: 'Belediye acil hizmetleri',
      icon: 'business',
      color: '#2E5266',
      priority: 6,
    },
    {
      id: 7,
      title: 'Doğalgaz Arıza',
      phone: '187',
      description: 'Doğalgaz kaçağı ve arıza bildirimi',
      icon: 'gas-meter',
      color: '#FF5722',
      priority: 7,
    },
    {
      id: 8,
      title: 'Elektrik Arıza',
      phone: '186',
      description: 'Elektrik kesintisi ve arıza bildirimi',
      icon: 'electrical-services',
      color: '#FF9800',
      priority: 8,
    },
  ];

  const makePhoneCall = (phoneNumber, title) => {
    Alert.alert(
      'Arama Yapılsın mı?',
      `${title} numarasını (${phoneNumber}) aramak istediğinizden emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Ara',
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ]
    );
  };

  const EmergencyCard = ({ contact }) => (
    <TouchableOpacity
      style={[styles.emergencyCard, { borderLeftColor: contact.color }]}
      onPress={() => makePhoneCall(contact.phone, contact.title)}
    >
      <View style={[styles.iconContainer, { backgroundColor: contact.color }]}>
        <Icon name={contact.icon} size={24} color={colors.white} />
      </View>
      
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{contact.title}</Text>
        <Text style={styles.contactPhone}>{contact.phone}</Text>
        <Text style={styles.contactDescription}>{contact.description}</Text>
      </View>
      
      <Icon name="phone" size={24} color={colors.primary} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={styles.loadingText}>Acil durum numaraları yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Icon name="warning" size={32} color={colors.white} />
          <Text style={styles.headerTitle}>Acil Durumlar</Text>
          <Text style={styles.headerSubtitle}>
            Acil durumlarda aşağıdaki numaraları arayabilirsiniz
          </Text>
        </View>

        <View style={styles.warningBox}>
          <Icon name="info" size={20} color={colors.warning} />
          <Text style={styles.warningText}>
            Gerçek acil durumlar için 112'yi arayın. 
            Bu uygulama sadece bilgi amaçlıdır.
          </Text>
        </View>

        <View style={styles.contactsSection}>
          {emergencyContacts.map((contact) => (
            <EmergencyCard key={contact.id} contact={contact} />
          ))}
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Acil Durum İpuçları</Text>
          
          <View style={styles.tipCard}>
            <Icon name="phone-in-talk" size={20} color={colors.primary} />
            <Text style={styles.tipText}>
              Acil durum numarasını ararken sakin kalın ve durumu net bir şekilde açıklayın.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Icon name="location-on" size={20} color={colors.primary} />
            <Text style={styles.tipText}>
              Konumunuzu ve adresinizi net bir şekilde belirtin.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Icon name="people" size={20} color={colors.primary} />
            <Text style={styles.tipText}>
              Yaralı varsa sayısını ve durumlarını belirtin.
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
    backgroundColor: colors.error,
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
  warningBox: {
    backgroundColor: '#FFF3CD',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    marginLeft: 8,
    flex: 1,
  },
  contactsSection: {
    paddingHorizontal: 16,
  },
  emergencyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    ...commonStyles.shadow,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  tipsSection: {
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  tipCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...commonStyles.shadow,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});

export default EmergencyScreen; 