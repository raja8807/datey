// import React, { useEffect, useState } from "react";
// import { useHealthCheck } from "./src/api_hooks/health_check.hooks";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./src/config/queryClient";
import { useHealthCheck } from "./src/api_hooks/health_check.hooks";
import Constants from "expo-constants";

const MainApp = () => {
  const { session } = useAuth();
  const { data, isLoading, isError } = useHealthCheck();

  const { API_URL } = Constants.expoConfig.extra;

  const getApiStatus = () => {
    if (isLoading) {
      return "Loading...";
    }

    if (isError) {
      return "Error...";
    }

    return data;
  };

  if (!session || session?.authState === "pending") {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />

      <Text
        style={{
          marginBottom: 16,
        }}
      >
        API Status : {API_URL} - {getApiStatus()}
      </Text>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}
