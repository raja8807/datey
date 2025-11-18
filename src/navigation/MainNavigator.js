import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/main/HomeScreen';
import ExploreScreen from '../screens/main/ExploreScreen';
import MatchesScreen from '../screens/main/MatchesScreen';
import ChatScreen from '../screens/main/ChatScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MatchesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MatchesList"
        component={MatchesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack.Navigator>
  );
}

function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreList"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🔍</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>💬</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

