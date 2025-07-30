import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES, TABLE_COLUMNS } from '../config/supabase';

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Yeni etkinlikler tablosundan veri çek
      const { data, error } = await supabase
        .from(TABLES.ETKINLIKLER)
        .select('*')
        .order(TABLE_COLUMNS.ETKINLIKLER.TARIH, { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
        // Fallback to demo data if Supabase fails
        setEvents(getDemoEvents());
      } else {
        setEvents(data || getDemoEvents());
      }
    } catch (error) {
      console.error('Error:', error);
      setEvents(getDemoEvents());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getDemoEvents = () => [
    {
      id: 1,
      ad: 'Tire Kültür Festivali',
      aciklama: 'Geleneksel el sanatları ve kültür etkinlikleri',
      tarih: '2024-06-15',
      adres: 'Tire Eski Belediye Binası',
      fotograf: null,
      telefon_numarasi: '0232 123 45 67',
      bilet_linki: null,
      enlem: 38.0897,
      boylam: 27.7358
    },
    {
      id: 2,
      ad: 'Ramazan Etkinlikleri',
      aciklama: 'İftar programları ve kültürel etkinlikler',
      tarih: '2024-04-20',
      adres: 'Tire Merkez',
      fotograf: null,
      telefon_numarasi: '0232 123 45 68',
      bilet_linki: null,
      enlem: 38.0895,
      boylam: 27.7355
    },
    {
      id: 3,
      ad: 'Çevre Gününü Kutlama',
      aciklama: 'Ağaç dikme ve çevre bilincini artırma etkinliği',
      tarih: '2024-06-05',
      adres: 'Tire Millet Bahçesi',
      fotograf: null,
      telefon_numarasi: '0232 123 45 69',
      bilet_linki: null,
      enlem: 38.0900,
      boylam: 27.7360
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const EventCard = ({ event }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', { event })}
    >
      <View style={styles.eventImageContainer}>
        {event.fotograf ? (
          <Image source={{ uri: event.fotograf }} style={styles.eventImage} />
        ) : (
          <View style={styles.eventImagePlaceholder}>
            <Icon name="event" size={40} color={colors.primary} />
          </View>
        )}
      </View>
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.ad}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {event.aciklama}
        </Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <Icon name="event" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{formatDate(event.tarih)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="location-on" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{event.adres}</Text>
          </View>
          
          {event.telefon_numarasi && (
            <View style={styles.detailRow}>
              <Icon name="phone" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{event.telefon_numarasi}</Text>
            </View>
          )}
        </View>
        
        {event.bilet_linki && (
          <View style={styles.ticketSection}>
            <TouchableOpacity style={styles.ticketButton}>
              <Icon name="confirmation-number" size={16} color={colors.white} />
              <Text style={styles.ticketButtonText}>Bilet Al</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={styles.loadingText}>Etkinlikler yükleniyor...</Text>
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
          <Icon name="event" size={32} color={colors.white} />
          <Text style={styles.headerTitle}>Etkinlikler</Text>
          <Text style={styles.headerSubtitle}>
            Tire'deki güncel etkinlikler ve organizasyonlar
          </Text>
        </View>

        <View style={styles.eventsSection}>
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="event" size={64} color={colors.gray} />
              <Text style={styles.emptyStateText}>
                Etkinlik bilgisi bulunamadı.
              </Text>
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
  header: {
    padding: 20,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  eventCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  eventImageContainer: {
    marginRight: 12,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  eventImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  eventDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  ticketSection: {
    marginTop: 12,
    alignItems: 'center',
  },
  ticketButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  ticketButtonText: {
    color: colors.white,
    fontSize: 14,
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

export default EventsScreen; 