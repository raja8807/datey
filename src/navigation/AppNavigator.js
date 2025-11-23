import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import ProfileSetupNavigator from "./ProfileSetupNavigator";
import MainNavigator from "./MainNavigator";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { session } = useAuth();

  const isAuthenticated = session?.authState === "authenticated";

  const getIsProfileCompleted = () => {
    if (!!session?.user && !!session?.user?.interests?.[0]) {
      return true;
    }

    return false;
  };

  const isProfileComplete = getIsProfileCompleted();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* NOT LOGGED IN → Auth flow */}
      {!isAuthenticated && (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}

      {/* LOGGED IN BUT PROFILE NOT COMPLETED */}
      {isAuthenticated && !isProfileComplete && (
        <Stack.Screen name="ProfileSetup" component={ProfileSetupNavigator} />
      )}

      {/* LOGGED IN AND PROFILE COMPLETED */}
      {isAuthenticated && isProfileComplete && (
        <Stack.Screen name="MainApp" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
}
