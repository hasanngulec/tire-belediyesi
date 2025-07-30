import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const openPhone = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const openTicketLink = (ticketLink) => {
    if (ticketLink) {
      Linking.openURL(ticketLink);
    }
  };

  const openMaps = () => {
    if (event.enlem && event.boylam) {
      const url = `https://www.google.com/maps?q=${event.enlem},${event.boylam}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{event.ad}</Text>
            <Text style={styles.headerSubtitle}>
              {formatDate(event.tarih)}
            </Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          {event.fotograf ? (
            <Image source={{ uri: event.fotograf }} style={styles.eventImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="event" size={64} color={colors.primary} />
            </View>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Etkinlik Detayları</Text>
            <Text style={styles.description}>{event.aciklama}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Konum</Text>
            <View style={styles.locationInfo}>
              <Icon name="location-on" size={20} color={colors.primary} />
              <Text style={styles.locationText}>{event.adres}</Text>
            </View>
            
            {(event.enlem && event.boylam) && (
              <TouchableOpacity style={styles.mapButton} onPress={openMaps}>
                <Icon name="map" size={16} color={colors.white} />
                <Text style={styles.mapButtonText}>Haritada Göster</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Tarih ve Saat</Text>
            <View style={styles.dateInfo}>
              <Icon name="event" size={20} color={colors.primary} />
              <Text style={styles.dateText}>{formatDate(event.tarih)}</Text>
            </View>
          </View>

          {event.telefon_numarasi && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📞 İletişim</Text>
              <TouchableOpacity 
                style={styles.phoneButton}
                onPress={() => openPhone(event.telefon_numarasi)}
              >
                <Icon name="phone" size={16} color={colors.white} />
                <Text style={styles.phoneButtonText}>{event.telefon_numarasi}</Text>
              </TouchableOpacity>
            </View>
          )}

          {event.bilet_linki && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎫 Bilet</Text>
              <TouchableOpacity 
                style={styles.ticketButton}
                onPress={() => openTicketLink(event.bilet_linki)}
              >
                <Icon name="confirmation-number" size={16} color={colors.white} />
                <Text style={styles.ticketButtonText}>Bilet Al</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Etkinlik İpuçları</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tipText}>• Etkinlik saatinden 15 dakika önce gelin</Text>
              <Text style={styles.tipText}>• Yanınızda kimlik bulundurun</Text>
              <Text style={styles.tipText}>• Fotoğraf çekmek için izin alın</Text>
              <Text style={styles.tipText}>• Etkinlik kurallarına uyun</Text>
            </View>
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
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  imageContainer: {
    height: 200,
    backgroundColor: colors.background,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 8,
    flex: 1,
  },
  mapButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 8,
  },
  phoneButton: {
    backgroundColor: colors.success,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  phoneButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  ticketButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ticketButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

export default EventDetailScreen; 