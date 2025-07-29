import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES } from '../config/supabase';

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.EVENTS)
        .select('*')
        .order('event_date', { ascending: false });

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
      title: 'Tire Kültür Festivali',
      description: 'Geleneksel el sanatları ve kültür etkinlikleri',
      event_date: '2024-06-15',
      location: 'Tire Eski Belediye Binası',
      image_url: null,
    },
    {
      id: 2,
      title: 'Ramazan Etkinlikleri',
      description: 'İftar programları ve kültürel etkinlikler',
      event_date: '2024-04-20',
      location: 'Tire Merkez',
      image_url: null,
    },
    {
      id: 3,
      title: 'Çevre Gününü Kutlama',
      description: 'Ağaç dikme ve çevre bilincini artırma etkinliği',
      event_date: '2024-06-05',
      location: 'Tire Millet Bahçesi',
      image_url: null,
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
        {event.image_url ? (
          <Image source={{ uri: event.image_url }} style={styles.eventImage} />
        ) : (
          <View style={styles.eventImagePlaceholder}>
            <Icon name="event" size={40} color={colors.primary} />
          </View>
        )}
      </View>
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {event.description}
        </Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailRow}>
            <Icon name="access-time" size={16} color={colors.primary} />
            <Text style={styles.eventDetailText}>
              {formatDate(event.event_date)}
            </Text>
          </View>
          
          <View style={styles.eventDetailRow}>
            <Icon name="place" size={16} color={colors.primary} />
            <Text style={styles.eventDetailText}>{event.location}</Text>
          </View>
        </View>
      </View>
      
      <Icon name="chevron-right" size={24} color={colors.gray} />
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
          <Text style={styles.headerTitle}>Güncel Etkinlikler</Text>
          <Text style={styles.headerSubtitle}>
            Tire'de düzenlenen etkinlikleri takip edin
          </Text>
        </View>

        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="event-busy" size={64} color={colors.gray} />
            <Text style={styles.emptyStateText}>
              Şu anda planlanmış etkinlik bulunmamaktadır.
            </Text>
          </View>
        )}
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
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventDetailText: {
    fontSize: 12,
    color: colors.text.secondary,
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