import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

import Constants from "expo-constants";
const { SUPABASE_URL, SUPABASE_KEY } = Constants.expoConfig.extra;
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
