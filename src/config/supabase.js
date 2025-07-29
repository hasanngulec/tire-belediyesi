import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://sfulbvzijpvrkbqzadtl.supabase.co';
const supabaseKey = 'frAUrdHDf6iHQn2p'; // Note: In production, use environment variables

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database tables structure
export const TABLES = {
  EVENTS: 'events',
  TOURISM_SPOTS: 'tourism_spots',
  TRAVEL_ROUTES: 'travel_routes',
  EMERGENCY_CONTACTS: 'emergency_contacts',
  DUTY_PHARMACIES: 'duty_pharmacies',
  NEWS: 'news',
  CONTACT_INFO: 'contact_info',
  MAYOR_MESSAGES: 'mayor_messages'
}; 