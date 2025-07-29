import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { commonStyles } from '../styles/commonStyles';
import { supabase, TABLES } from '../config/supabase';

const MayorMessageScreen = () => {
  const [mayorMessages, setMayorMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMayorMessages();
  }, []);

  const fetchMayorMessages = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.MAYOR_MESSAGES)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching mayor messages:', error);
        setMayorMessages(getDemoMayorMessages());
      } else {
        setMayorMessages(data || getDemoMayorMessages());
      }
    } catch (error) {
      console.error('Error:', error);
      setMayorMessages(getDemoMayorMessages());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getDemoMayorMessages = () => [
    {
      id: 1,
      title: 'Hoş Geldiniz - Sayın Vatandaşlarım',
      content: `Sevgili hemşehrilerim,

Tire Belediyesi olarak sizlere en iyi hizmeti sunabilmek için çalışmaya devam ediyoruz. Bu mobil uygulama ile belediye hizmetlerimize daha kolay erişebilir, şehrimizin güzelliklerini keşfedebilirsiniz.

Tire, tarihi zenginlikleri ve kültürel değerleri ile öne çıkan bir şehirdir. Osmanlı döneminden kalma tarihi yapıları, geleneksel el sanatları ve misafirperver halkımız ile her zaman ziyaretçilerini ağırlamaktan gurur duyar.

Bu uygulama sayesinde:
• Güncel etkinliklerimizi takip edebilir
• Tarihi ve turistik yerlerimizi keşfedebilir
• Acil durumlarda gerekli bilgilere ulaşabilir
• Bizimle kolayca iletişime geçebilirsiniz

Tire'yi daha da güzel bir şehir yapmak için birlikte çalışmaya devam edeceğiz.

Saygılarımla,
Tire Belediye Başkanı`,
      date: '2024-01-10',
      image_url: null,
      author: 'Tire Belediye Başkanı',
    },
    {
      id: 2,
      title: 'Kültür Festivali Daveti',
      content: `Değerli Tire halkı,

Bu yıl düzenleyeceğimiz Tire Kültür Festivali için sizleri davet ediyorum. Geleneksel el sanatlarımızın sergileneceği, yerel sanatçılarımızın performans sergileyeceği bu özel etkinlikte buluşalım.

Festival programında:
• Geleneksel el sanatları sergisi
• Halk oyunları gösterileri
• Yerel müzik dinletileri
• Tire yemekleri tanıtımı

Hep birlikte kültürümüzü yaşatalım, gelecek nesillere aktaralım.`,
      date: '2024-01-05',
      image_url: null,
      author: 'Tire Belediye Başkanı',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchMayorMessages();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const MessageCard = ({ message }) => (
    <View style={styles.messageCard}>
      <View style={styles.messageHeader}>
        <View style={styles.authorSection}>
          <View style={styles.authorImagePlaceholder}>
            <Icon name="person" size={40} color={colors.primary} />
          </View>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{message.author}</Text>
            <Text style={styles.messageDate}>{formatDate(message.date)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.messageContent}>
        <Text style={styles.messageTitle}>{message.title}</Text>
        <Text style={styles.messageText}>{message.content}</Text>
      </View>

      {message.image_url && (
        <View style={styles.messageImageContainer}>
          <Image source={{ uri: message.image_url }} style={styles.messageImage} />
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Text style={styles.loadingText}>Başkan mesajları yükleniyor...</Text>
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
          <View style={styles.headerIconContainer}>
            <Icon name="person" size={48} color={colors.white} />
          </View>
          <Text style={styles.headerTitle}>Başkanın Mesajı</Text>
          <Text style={styles.headerSubtitle}>
            Belediye başkanımızdan sizlere özel mesajlar
          </Text>
        </View>

        <View style={styles.messagesSection}>
          {mayorMessages.length > 0 ? (
            mayorMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="message" size={64} color={colors.gray} />
              <Text style={styles.emptyStateText}>
                Şu anda görüntülenecek mesaj bulunmamaktadır.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.footerSection}>
          <View style={styles.footerCard}>
            <Icon name="info" size={24} color={colors.primary} />
            <View style={styles.footerText}>
              <Text style={styles.footerTitle}>Bizimle İletişime Geçin</Text>
              <Text style={styles.footerDescription}>
                Görüş ve önerilerinizi bize iletmekten çekinmeyin. 
                Tire'yi birlikte daha güzel hale getirelim.
              </Text>
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
    padding: 24,
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
    textAlign: 'center',
    opacity: 0.9,
  },
  messagesSection: {
    padding: 16,
  },
  messageCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...commonStyles.shadow,
  },
  messageHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  messageDate: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  messageContent: {
    padding: 16,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
    lineHeight: 28,
  },
  messageText: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
    textAlign: 'justify',
  },
  messageImageContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  footerSection: {
    padding: 16,
    paddingBottom: 32,
  },
  footerCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...commonStyles.shadow,
  },
  footerText: {
    marginLeft: 12,
    flex: 1,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  footerDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
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

export default MayorMessageScreen; 