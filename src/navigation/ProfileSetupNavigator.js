import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BasicInfoScreen from "../screens/profile/BasicInfoScreen";
import UploadPhotosScreen from "../screens/profile/UploadPhotosScreen";
import PreferencesScreen from "../screens/profile/PreferencesScreen";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function ProfileSetupNavigator() {
  const { session } = useAuth();

  const isBasicInfCompleted =
    !!session?.user?.name && !!session?.user?.age && !!session?.user?.gender;

  const isPreferencesCompleted =
    isBasicInfCompleted && !!session?.user?.interests?.[0];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isBasicInfCompleted && (
        <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      )}
      {!isPreferencesCompleted && (
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
      )}
      {/* <Stack.Screen name="UploadPhotos" component={UploadPhotosScreen} /> */}
    </Stack.Navigator>
  );
}
