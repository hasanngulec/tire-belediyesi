import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Remote update devre dışı bırakma
if (__DEV__) {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('java.io.IOException: failed to download remote update')) {
      return; // Bu hatayı görmezden gel
    }
    originalConsoleError.apply(console, args);
  };
}

// Screens
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import TourismScreen from './screens/TourismScreen';
import TourismSpotDetailScreen from './screens/TourismSpotDetailScreen';
import TravelRoutesScreen from './screens/TravelRoutesScreen';
import MapScreen from './screens/MapScreen';
import EmergencyScreen from './screens/EmergencyScreen';
import DutyPharmaciesScreen from './screens/DutyPharmaciesScreen';
import ContactScreen from './screens/ContactScreen';
import MayorMessageScreen from './screens/MayorMessageScreen';
import HowToGetThereScreen from './screens/HowToGetThereScreen';
import InfluencerRoutesScreen from './screens/InfluencerRoutesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack Navigator
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E5266',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MayorMessage" component={MayorMessageScreen} options={{ title: 'Başkanın Mesajı' }} />
      <Stack.Screen name="Emergency" component={EmergencyScreen} options={{ title: 'Acil Durumlar' }} />
      <Stack.Screen name="DutyPharmacies" component={DutyPharmaciesScreen} options={{ title: 'Nöbetçi Eczaneler' }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Bize Ulaşın' }} />
      <Stack.Screen name="HowToGetThere" component={HowToGetThereScreen} options={{ title: 'Nasıl Gelinir' }} />
      <Stack.Screen name="TravelRoutes" component={TravelRoutesScreen} options={{ title: 'Gezi Rotaları' }} />
      <Stack.Screen name="InfluencerRoutes" component={InfluencerRoutesScreen} options={{ title: 'Influencer Rota Önerileri' }} />
    </Stack.Navigator>
  );
}

// Events Stack Navigator
function EventsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E5266',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="EventsList" component={EventsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Etkinlik Detayı' }} />
    </Stack.Navigator>
  );
}

// Tourism Stack Navigator
function TourismStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E5266',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="TourismSpots" component={TourismScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TourismSpotDetail" component={TourismSpotDetailScreen} options={{ title: 'Gezi Noktası Detayı' }} />
      <Stack.Screen name="TravelRoutes" component={TravelRoutesScreen} options={{ title: 'Gezi Rotaları' }} />
      <Stack.Screen name="HowToGetThere" component={HowToGetThereScreen} options={{ title: 'Nasıl Gelinir' }} />
      <Stack.Screen name="InfluencerRoutes" component={InfluencerRoutesScreen} options={{ title: 'Influencer Rota Önerileri' }} />
    </Stack.Navigator>
  );
}

// Map Stack Navigator
function MapStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E5266',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="MapView" component={MapScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Tourism') {
            iconName = 'place';
          } else if (route.name === 'Events') {
            iconName = 'event';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E5266',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="Map" component={MapStackNavigator} options={{ title: 'Harita' }} />
      <Tab.Screen name="Tourism" component={TourismStackNavigator} options={{ title: 'Gezi Noktaları' }} />
      <Tab.Screen name="Events" component={EventsStackNavigator} options={{ title: 'Etkinlikler' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
} 