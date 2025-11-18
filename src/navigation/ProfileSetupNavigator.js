import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BasicInfoScreen from '../screens/profile/BasicInfoScreen';
import UploadPhotosScreen from '../screens/profile/UploadPhotosScreen';
import PreferencesScreen from '../screens/profile/PreferencesScreen';

const Stack = createNativeStackNavigator();

export default function ProfileSetupNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      <Stack.Screen name="UploadPhotos" component={UploadPhotosScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
    </Stack.Navigator>
  );
}

