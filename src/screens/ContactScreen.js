import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Linking, Alert, Clipboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactScreen = ({ navigation }) => {
  const contactInfo = {
    phone: "4443503",
    email: "tirebel@tire.bel.tr",
    address: "29 EKİM CAD. CUMHURİYET MAH. NO:19 35900 İZMİR/TİRE",
    whatsapp: "+90 444 35 03"
  };

  const departments = [
    {
      name: "İmar ve Şehircilik",
      phone: "(0312) 555 0125",
      email: "imar@xbelediyesi.gov.tr"
    },
    {
      name: "Çevre ve Temizlik",
      phone: "(0312) 555 0126",
      email: "cevre@xbelediyesi.gov.tr"
    },
    {
      name: "Kültür ve Sosyal İşler",
      phone: "(0312) 555 0127",
      email: "kultur@xbelediyesi.gov.tr"
    }
  ];

  const makePhoneCall = async (phoneNumber) => {
    try {
      // Telefon numarasını temizle ve formatla
      const cleanNumber = phoneNumber.replace(/\s/g, '');
      const url = `tel:${cleanNumber}`;
      console.log('Aranacak numara:', url);
      
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log('Telefon uygulaması açılamadı');
        // Numarayı panoya kopyala
        Clipboard.setString(cleanNumber);
        Alert.alert(
          'Telefon Uygulaması Bulunamadı', 
          `Telefon numarası panoya kopyalandı: ${cleanNumber}\n\nNumarayı manuel olarak arayabilirsiniz.`,
          [{ text: 'Tamam', style: 'default' }]
        );
      }
    } catch (error) {
      console.error('Telefon arama hatası:', error);
      Clipboard.setString(phoneNumber);
      Alert.alert(
        'Hata', 
        `Telefon arama işlemi başarısız oldu.\n\nNumara panoya kopyalandı: ${phoneNumber}`,
        [{ text: 'Tamam', style: 'default' }]
      );
    }
  };

  const sendEmail = async (email) => {
    try {
      const url = `mailto:${email}`;
      console.log('E-posta URL:', url);
      
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log('E-posta uygulaması açılamadı');
        // E-posta adresini panoya kopyala
        Clipboard.setString(email);
        Alert.alert(
          'E-posta Uygulaması Bulunamadı', 
          `E-posta adresi panoya kopyalandı: ${email}\n\nE-posta uygulamanızı manuel olarak açabilirsiniz.`,
          [{ text: 'Tamam', style: 'default' }]
        );
      }
    } catch (error) {
      console.error('E-posta gönderme hatası:', error);
      Clipboard.setString(email);
      Alert.alert(
        'Hata', 
        `E-posta gönderme işlemi başarısız oldu.\n\nE-posta adresi panoya kopyalandı: ${email}`,
        [{ text: 'Tamam', style: 'default' }]
      );
    }
  };

  const openWhatsApp = (phoneNumber) => {
    // WhatsApp için telefon numarasını temizle ve formatla
    const cleanNumber = phoneNumber.replace(/\s/g, '').replace('+90', '90');
    Linking.openURL(`whatsapp://send?phone=${cleanNumber}`);
  };

  const openMaps = () => {
    const address = contactInfo.address;
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bize Ulaşın</Text>
        <Text style={styles.headerSubtitle}>Sorularınız ve önerileriniz için bizimle iletişime geçin</Text>
      </View>

      {/* Contact Cards */}
      <View style={styles.contactCardsSection}>
        {/* Phone Card */}
        <TouchableOpacity 
          style={styles.contactCard}
          onPress={() => makePhoneCall(contactInfo.phone)}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="phone" size={24} color="#1976D2" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Telefon</Text>
            <Text style={styles.cardValue}>{contactInfo.phone}</Text>
            <Text style={styles.cardDescription}>Mesai saatleri içinde arayabilirsiniz</Text>
          </View>
        </TouchableOpacity>

        {/* Email Card */}
        <TouchableOpacity 
          style={styles.contactCard}
          onPress={() => sendEmail(contactInfo.email)}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="email" size={24} color="#1976D2" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>E-posta</Text>
            <Text style={styles.cardValue}>{contactInfo.email}</Text>
            <Text style={styles.cardDescription}>Sorularınızı e-posta ile iletebilirsiniz</Text>
          </View>
        </TouchableOpacity>

        {/* Address Card */}
        <TouchableOpacity 
          style={styles.contactCard}
          onPress={openMaps}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="place" size={24} color="#1976D2" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Adres</Text>
            <Text style={styles.cardValue}>{contactInfo.address}</Text>
            <Text style={styles.cardDescription}>Merkez binayı ziyaret edebilirsiniz</Text>
          </View>
        </TouchableOpacity>

        {/* WhatsApp Card */}
        <TouchableOpacity 
          style={styles.contactCard}
          onPress={() => openWhatsApp(contactInfo.whatsapp)}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="chat" size={24} color="#1976D2" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>WhatsApp İhbar</Text>
            <Text style={styles.cardValue}>{contactInfo.whatsapp}</Text>
            <Text style={styles.cardDescription}>7/24 WhatsApp destek hattı</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Departments Section */}
      <View style={styles.departmentsSection}>
        <Text style={styles.sectionTitle}>Departmanlar</Text>
        
        <View style={styles.departmentsList}>
          {departments.map((dept, index) => (
            <View key={index} style={styles.departmentCard}>
              <View style={styles.departmentInfo}>
                <Text style={styles.departmentName}>{dept.name}</Text>
                <TouchableOpacity onPress={() => makePhoneCall(dept.phone)}>
                  <Text style={styles.departmentPhone}>{dept.phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => sendEmail(dept.email)}>
                  <Text style={styles.departmentEmail}>{dept.email}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  contactCardsSection: {
    padding: 16,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
  },
  departmentsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 16,
  },
  departmentsList: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  departmentCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
    marginBottom: 8,
  },
  departmentPhone: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 4,
  },
  departmentEmail: {
    fontSize: 14,
    color: '#1976D2',
  },
});

export default ContactScreen; 