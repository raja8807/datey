import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import ProfileSetupNavigator from './ProfileSetupNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  // In a real app, this would check authentication state
  // For demo purposes, we'll start with Auth flow
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // For demo: Start with auth, then profile setup, then main app
  // You can change these to true to skip directly to main app

  const getInitialRouteName = () => {
    if (isAuthenticated) {
      if (isProfileComplete) {
        return 'MainApp';
      }
      return 'ProfileSetup';
    } else {
      return 'Auth';
    }
  };

  

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={getInitialRouteName()}
      
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupNavigator} />
      <Stack.Screen name="MainApp" component={MainNavigator} />
    </Stack.Navigator>
  );
}

