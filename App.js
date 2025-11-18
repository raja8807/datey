import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

const MainApp = () => {
  const { session } = useAuth();

  if (session.authState === "pending") {
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </>
  );
}
