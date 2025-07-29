import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES } from '../config/supabase';

const DutyPharmaciesScreen = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.DUTY_PHARMACIES)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pharmacies:', error);
        setPharmacies(getDemoPharmacies());
      } else {
        setPharmacies(data || getDemoPharmacies());
      }
    } catch (error) {
      console.error('Error:', error);
      setPharmacies(getDemoPharmacies());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getDemoPharmacies = () => [
    {
      id: 1,
      name: 'Ege Eczanesi',
      address: 'Cumhuriyet Cad. No:45 Tire/İzmir',
      phone: '0232 512 34 56',
      duty_date: '2024-01-15',
      duty_hours: '08:00 - 22:00',
      is_night_duty: false,
    },
    {
      id: 2,
      name: 'Merkez Eczanesi',
      address: 'Atatürk Cad. No:12 Tire/İzmir',
      phone: '0232 512 67 89',
      duty_date: '2024-01-15',
      duty_hours: '22:00 - 08:00',
      is_night_duty: true,
    },
    {
      id: 3,
      name: 'Sağlık Eczanesi',
      address: 'İnönü Mah. Şifa Sok. No:8 Tire/İzmir',
      phone: '0232 512 90 12',
      duty_date: '2024-01-16',
      duty_hours: '08:00 - 22:00',
      is_night_duty: false,
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchPharmacies();
  };

  const makePhoneCall = (phoneNumber, pharmacyName) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const openMaps = (address) => {
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const PharmacyCard = ({ pharmacy }) => (
    <View style={[
      styles.pharmacyCard,
      pharmacy.is_night_duty && styles.nightDutyCard
    ]}>
      <View style={styles.pharmacyHeader}>
        <View style={styles.pharmacyTitleRow}>
          <Icon 
            name="local-pharmacy" 
            size={24} 
            color={pharmacy.is_night_duty ? colors.info : colors.success} 
          />
          <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
          {pharmacy.is_night_duty && (
            <View style={styles.nightBadge}>
              <Text style={styles.nightBadgeText}>Gece</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.pharmacyDetails}>
        <View style={styles.detailRow}>
          <Icon name="access-time" size={16} color={colors.text.secondary} />
          <Text style={styles.detailText}>
            {formatDate(pharmacy.duty_date)} - {pharmacy.duty_hours}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="place" size={16} color={colors.text.secondary} />
          <TouchableOpacity onPress={() => openMaps(pharmacy.address)}>
            <Text style={[styles.detailText, styles.linkText]}>
              {pharmacy.address}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailRow}>
          <Icon name="phone" size={16} color={colors.text.secondary} />
          <TouchableOpacity onPress={() => makePhoneCall(pharmacy.phone, pharmacy.name)}>
            <Text style={[styles.detailText, styles.linkText]}>
              {pharmacy.phone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => makePhoneCall(pharmacy.phone, pharmacy.name)}
        >
          <Icon name="phone" size={20} color={colors.primary} />
          <Text style={styles.actionButtonText}>Ara</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => openMaps(pharmacy.address)}
        >
          <Icon name="directions" size={20} color={colors.primary} />
          <Text style={styles.actionButtonText}>Yol Tarifi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={styles.loadingText}>Nöbetçi eczaneler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Icon name="local-pharmacy" size={32} color={colors.white} />
          <Text style={styles.headerTitle}>Nöbetçi Eczaneler</Text>
          <Text style={styles.headerSubtitle}>
            Güncel nöbetçi eczane listesi
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Icon name="info" size={20} color={colors.info} />
          <Text style={styles.infoText}>
            Eczane listesi günlük olarak güncellenmektedir. 
            Güncel bilgi için eczaneyi arayabilirsiniz.
          </Text>
        </View>

        <View style={styles.pharmaciesSection}>
          {pharmacies.length > 0 ? (
            pharmacies.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="local-pharmacy" size={64} color={colors.gray} />
              <Text style={styles.emptyStateText}>
                Nöbetçi eczane bilgisi bulunamadı.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.emergencySection}>
          <Text style={styles.sectionTitle}>Acil Durum İlaç İhtiyacı</Text>
          <Text style={styles.emergencyText}>
            Gece saatlerinde acil ilaç ihtiyacınız için gece nöbetçisi eczaneleri arayabilir 
            veya 112 Acil Sağlık hizmetlerinden yardım alabilirsiniz.
          </Text>
          
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => makePhoneCall('112', 'Acil Sağlık')}
          >
            <Icon name="local-hospital" size={20} color={colors.white} />
            <Text style={styles.emergencyButtonText}>112 Acil Sağlık</Text>
          </TouchableOpacity>
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
    backgroundColor: colors.success,
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
  infoBox: {
    backgroundColor: '#E3F2FD',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#1565C0',
    marginLeft: 8,
    flex: 1,
  },
  pharmaciesSection: {
    paddingHorizontal: 16,
  },
  pharmacyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    ...commonStyles.shadow,
  },
  nightDutyCard: {
    borderLeftColor: colors.info,
    backgroundColor: '#F8F9FF',
  },
  pharmacyHeader: {
    marginBottom: 12,
  },
  pharmacyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  },
  nightBadge: {
    backgroundColor: colors.info,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  nightBadgeText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  pharmacyDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  actionButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  emergencySection: {
    padding: 16,
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    ...commonStyles.shadow,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  emergencyButton: {
    backgroundColor: colors.error,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emergencyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default DutyPharmaciesScreen; 