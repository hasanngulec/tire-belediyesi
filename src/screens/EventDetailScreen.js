import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Calendar from 'expo-calendar';

const { width } = Dimensions.get('window');

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const [isAddingToCalendar, setIsAddingToCalendar] = useState(false);

  const requestCalendarPermission = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Takvim izni hatası:', error);
      return false;
    }
  };

  const addEventToCalendar = async () => {
    try {
      setIsAddingToCalendar(true);
      
      const hasPermission = await requestCalendarPermission();
      if (!hasPermission) {
        Alert.alert(
          'İzin Gerekli',
          'Etkinliği takviminize eklemek için takvim izni gereklidir.',
          [{ text: 'Tamam' }]
        );
        return;
      }

      // Etkinlik tarihini parse et
      const eventDate = new Date(event.tarih);
      const startDate = new Date(eventDate);
      startDate.setHours(10, 0, 0, 0); // Sabah 10:00'da başlasın
      const endDate = new Date(startDate);
      endDate.setHours(12, 0, 0, 0); // 2 saat sürsün

      // Varsayılan takvimi al
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = calendars.find(calendar => calendar.isPrimary) || calendars[0];

      if (!defaultCalendar) {
        Alert.alert('Hata', 'Takvim bulunamadı.');
        return;
      }

      const eventDetails = {
        title: event.ad,
        startDate: startDate,
        endDate: endDate,
        location: event.adres,
        notes: event.aciklama,
        timeZone: 'Europe/Istanbul',
        calendarId: defaultCalendar.id,
      };

      const eventId = await Calendar.createEventAsync(defaultCalendar.id, eventDetails);
      
      Alert.alert(
        'Başarılı!',
        'Etkinlik takviminize eklendi.',
        [{ text: 'Tamam' }]
      );
      
    } catch (error) {
      console.error('Takvim ekleme hatası:', error);
      Alert.alert(
        'Hata',
        'Etkinlik takviminize eklenirken bir hata oluştu.',
        [{ text: 'Tamam' }]
      );
    } finally {
      setIsAddingToCalendar(false);
    }
  };

  const openMaps = () => {
    if (event.enlem && event.boylam) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${event.enlem},${event.boylam}`;
      Linking.openURL(url);
    }
  };

  const openPhone = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        {event.fotograf ? (
          <Image 
            source={{ uri: event.fotograf }} 
            style={styles.headerImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="event" size={80} color="#ccc" />
            <Text style={styles.placeholderText}>Fotoğraf Yok</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title and Category */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{event.ad}</Text>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>Etkinlik</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>{event.aciklama}</Text>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          {/* Date Info */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name="calendar-today" size={20} color="#1976D2" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Tarih</Text>
              <Text style={styles.infoValue}>{formatDate(event.tarih)}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.reminderButton, isAddingToCalendar && styles.reminderButtonDisabled]} 
              onPress={addEventToCalendar}
              activeOpacity={0.7}
              disabled={isAddingToCalendar}
            >
              <Text style={styles.reminderButtonText}>
                {isAddingToCalendar ? 'Ekleniyor...' : 'Bana Hatırlat'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Location Info */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name="location-on" size={20} color="#1976D2" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Konum</Text>
              <Text style={styles.infoValue}>{event.adres}</Text>
            </View>
            <TouchableOpacity style={styles.directionsButton} onPress={openMaps} activeOpacity={0.7}>
              <Text style={styles.directionsButtonText}>Yol Tarifi</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Icon name="favorite" size={22} color="white" />
            <Text style={styles.primaryButtonText}>Favorilere Ekle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Icon name="share" size={22} color="#1976D2" />
            <Text style={styles.secondaryButtonText}>Paylaş</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    width: '100%',
    height: 280,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e8f4f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 12,
    lineHeight: 32,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    alignSelf: 'flex-start',
  },
  categoryChipText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  descriptionSection: {
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: '#555',
    textAlign: 'left',
  },
  infoSection: {
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  reminderButton: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reminderButtonDisabled: {
    backgroundColor: '#ccc',
  },
  reminderButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  directionsButton: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  directionsButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1976D2',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default EventDetailScreen;
