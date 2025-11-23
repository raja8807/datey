import axios from "axios";

import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { API_URL } = Constants.expoConfig.extra;

const API = axios.create({
  baseURL: API_URL, // Replace with your backend URL
  timeout: 100000,
});

export const getSessionFromStorageAsync = async () => {
  try {
    // FIX: fetch keys first
    const keys = await AsyncStorage.getAllKeys();
    const authTokenKey = keys.find((key) => key.includes("auth-token"));
    if (!authTokenKey) return null;

    const storage = await AsyncStorage.getItem(authTokenKey);
    if (!storage) return null;

    const parsed = JSON.parse(storage);
    return parsed; // contains access_token, refresh_token, etc.
  } catch (error) {
    console.log("getSessionFromStorageAsync error:", error);
    return null;
  }
};

// Optional: attach token if using auth
API.interceptors.request.use(async (config) => {
  try {
    const session = await getSessionFromStorageAsync();
    let token = session?.access_token || "";
    config.headers.Authorization = token ? `Bearer ${token}` : "Bearer";
    return config;
  } catch {
    return config;
  }
});

export default API;
