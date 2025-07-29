import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          {event.image_url ? (
            <Image source={{ uri: event.image_url }} style={styles.eventImage} />
          ) : (
            <View style={styles.eventImagePlaceholder}>
              <Icon name="event" size={80} color={colors.primary} />
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Icon name="access-time" size={24} color={colors.primary} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Tarih ve Saat</Text>
                <Text style={styles.detailValue}>
                  {formatDate(event.event_date)}
                </Text>
                {event.event_time && (
                  <Text style={styles.detailValue}>
                    {formatTime(event.event_time)}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="place" size={24} color={colors.primary} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Konum</Text>
                <Text style={styles.detailValue}>{event.location}</Text>
              </View>
            </View>

            {event.organizer && (
              <View style={styles.detailRow}>
                <Icon name="group" size={24} color={colors.primary} />
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Düzenleyen</Text>
                  <Text style={styles.detailValue}>{event.organizer}</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Etkinlik Detayları</Text>
            <Text style={styles.description}>
              {event.description || 'Bu etkinlik hakkında detaylı bilgi yakında paylaşılacaktır.'}
            </Text>
          </View>

          {event.requirements && (
            <View style={styles.requirementsSection}>
              <Text style={styles.sectionTitle}>Katılım Koşulları</Text>
              <Text style={styles.description}>{event.requirements}</Text>
            </View>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Icon name="calendar-today" size={20} color={colors.white} />
              <Text style={styles.primaryButtonText}>Takvime Ekle</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Icon name="share" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Paylaş</Text>
            </TouchableOpacity>
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
  imageContainer: {
    height: 200,
    backgroundColor: colors.background,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  eventImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailText: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  requirementsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventDetailScreen; 