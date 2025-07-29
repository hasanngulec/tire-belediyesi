import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Linking, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';

const ContactScreen = () => {
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const contactInfo = {
    address: 'Cumhuriyet Meydanı, Tire Belediyesi\n35900 Tire/İzmir',
    phone: '0232 512 60 20',
    fax: '0232 512 60 21',
    email: 'info@tire.bel.tr',
    website: 'www.tire.bel.tr',
    workingHours: 'Pazartesi - Cuma: 08:00 - 17:00',
  };

  const socialMedia = [
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com/tirebelediyesi' },
    { name: 'Twitter', icon: 'alternate-email', url: 'https://twitter.com/tirebelediyesi' },
    { name: 'Instagram', icon: 'camera-alt', url: 'https://instagram.com/tirebelediyesi' },
    { name: 'YouTube', icon: 'play-circle-filled', url: 'https://youtube.com/tirebelediyesi' },
  ];

  const departments = [
    { name: 'Başkan', phone: '0232 512 60 20', extension: '101' },
    { name: 'İmar ve Şehircilik', phone: '0232 512 60 20', extension: '102' },
    { name: 'Çevre ve Temizlik', phone: '0232 512 60 20', extension: '103' },
    { name: 'Kültür ve Sosyal İşler', phone: '0232 512 60 20', extension: '104' },
    { name: 'Muhasebe', phone: '0232 512 60 20', extension: '105' },
    { name: 'İnsan Kaynakları', phone: '0232 512 60 20', extension: '106' },
  ];

  const handleInputChange = (field, value) => {
    setMessageForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendMessage = () => {
    if (!messageForm.name || !messageForm.message) {
      Alert.alert('Hata', 'Lütfen ad ve mesaj alanlarını doldurun.');
      return;
    }

    // In real app, send to Supabase or email service
    Alert.alert(
      'Mesaj Gönderildi',
      'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.',
      [
        {
          text: 'Tamam',
          onPress: () => {
            setMessageForm({
              name: '',
              email: '',
              phone: '',
              subject: '',
              message: '',
            });
          }
        }
      ]
    );
  };

  const makePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openWebsite = (url) => {
    Linking.openURL(url);
  };

  const openMaps = () => {
    const address = 'Cumhuriyet Meydanı, Tire Belediyesi, 35900 Tire/İzmir';
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Icon name="contact-mail" size={32} color={colors.white} />
          <Text style={styles.headerTitle}>Bize Ulaşın</Text>
          <Text style={styles.headerSubtitle}>
            Sorularınız ve önerileriniz için bizimle iletişime geçin
          </Text>
        </View>

        {/* Quick Contact */}
        <View style={styles.quickContactSection}>
          <Text style={styles.sectionTitle}>Hızlı İletişim</Text>
          
          <View style={styles.quickContactGrid}>
            <TouchableOpacity 
              style={styles.quickContactItem}
              onPress={() => makePhoneCall(contactInfo.phone)}
            >
              <Icon name="phone" size={24} color={colors.primary} />
              <Text style={styles.quickContactText}>Telefon</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickContactItem}
              onPress={() => sendEmail(contactInfo.email)}
            >
              <Icon name="email" size={24} color={colors.primary} />
              <Text style={styles.quickContactText}>E-posta</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickContactItem}
              onPress={openMaps}
            >
              <Icon name="place" size={24} color={colors.primary} />
              <Text style={styles.quickContactText}>Konum</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickContactItem}
              onPress={() => openWebsite(contactInfo.website)}
            >
              <Icon name="language" size={24} color={colors.primary} />
              <Text style={styles.quickContactText}>Website</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfoSection}>
          <Text style={styles.sectionTitle}>İletişim Bilgileri</Text>
          
          <View style={styles.contactCard}>
            <View style={styles.contactRow}>
              <Icon name="place" size={20} color={colors.primary} />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Adres</Text>
                <Text style={styles.contactValue}>{contactInfo.address}</Text>
              </View>
            </View>

            <View style={styles.contactRow}>
              <Icon name="phone" size={20} color={colors.primary} />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Telefon</Text>
                <TouchableOpacity onPress={() => makePhoneCall(contactInfo.phone)}>
                  <Text style={[styles.contactValue, styles.linkText]}>{contactInfo.phone}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.contactRow}>
              <Icon name="email" size={20} color={colors.primary} />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>E-posta</Text>
                <TouchableOpacity onPress={() => sendEmail(contactInfo.email)}>
                  <Text style={[styles.contactValue, styles.linkText]}>{contactInfo.email}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.contactRow}>
              <Icon name="access-time" size={20} color={colors.primary} />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Çalışma Saatleri</Text>
                <Text style={styles.contactValue}>{contactInfo.workingHours}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Departments */}
        <View style={styles.departmentsSection}>
          <Text style={styles.sectionTitle}>Birimler</Text>
          
          {departments.map((dept, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.departmentCard}
              onPress={() => makePhoneCall(dept.phone)}
            >
              <View style={styles.departmentInfo}>
                <Text style={styles.departmentName}>{dept.name}</Text>
                <Text style={styles.departmentPhone}>{dept.phone} - {dept.extension}</Text>
              </View>
              <Icon name="phone" size={20} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Message Form */}
        <View style={styles.messageSection}>
          <Text style={styles.sectionTitle}>Mesaj Gönder</Text>
          
          <View style={styles.messageForm}>
            <TextInput
              style={styles.input}
              placeholder="Adınız Soyadınız *"
              value={messageForm.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />

            <TextInput
              style={styles.input}
              placeholder="E-posta Adresiniz"
              value={messageForm.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Telefon Numaranız"
              value={messageForm.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Konu"
              value={messageForm.subject}
              onChangeText={(value) => handleInputChange('subject', value)}
            />

            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Mesajınız *"
              value={messageForm.message}
              onChangeText={(value) => handleInputChange('message', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Icon name="send" size={20} color={colors.white} />
              <Text style={styles.sendButtonText}>Mesaj Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Sosyal Medya</Text>
          
          <View style={styles.socialGrid}>
            {socialMedia.map((social, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.socialButton}
                onPress={() => openWebsite(social.url)}
              >
                <Icon name={social.icon} size={24} color={colors.primary} />
                <Text style={styles.socialText}>{social.name}</Text>
              </TouchableOpacity>
            ))}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  quickContactSection: {
    padding: 16,
  },
  quickContactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickContactItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
    ...commonStyles.shadow,
  },
  quickContactText: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  contactInfoSection: {
    padding: 16,
  },
  contactCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...commonStyles.shadow,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  contactText: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 22,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  departmentsSection: {
    padding: 16,
  },
  departmentCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...commonStyles.shadow,
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 2,
  },
  departmentPhone: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  messageSection: {
    padding: 16,
  },
  messageForm: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...commonStyles.shadow,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  messageInput: {
    height: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sendButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  socialSection: {
    padding: 16,
    paddingBottom: 32,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
    ...commonStyles.shadow,
  },
  socialText: {
    fontSize: 12,
    color: colors.text.primary,
    fontWeight: '500',
  },
});

export default ContactScreen; 