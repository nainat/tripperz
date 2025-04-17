// File: app/_layout.js

import React from 'react';
import { Tabs } from 'expo-router/tabs';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'; // Import icon sets

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: 'blue', // Optional: customize active color
        // tabBarInactiveTintColor: 'gray', // Optional: customize inactive color
        // tabBarStyle: { backgroundColor: 'white' }, // Optional: customize tab bar style
        headerShown: false, // Hide the default header if you have custom headers in screens
      }}
    >
      <Tabs.Screen
        name="index" // This corresponds to app/index.js or app/home.js if you rename
        options={{
          title: 'Home', // Tab label
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips" // Corresponds to app/trips.js
        options={{
          title: 'Trips',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="flag" size={size} color={color} />
          ),
        }}
      />

      {/* --- ADD THIS SECTION --- */}
      <Tabs.Screen
        name="map" // Corresponds to app/map.js
        options={{
          title: 'Map', // Tab label for the map screen
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" size={size} color={color} /> // Icon for map
          ),
        }}
      />
      {/* --- END OF ADDED SECTION --- */}

      <Tabs.Screen
        name="chat" // Corresponds to app/chat.js
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-sharp" size={size} color={color} /> // Example using Ionicons
          ),
        }}
      />

      <Tabs.Screen
        name="settings" // Corresponds to app/settings.js
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} /> // Example using MaterialIcons
          ),
        }}
      />
    </Tabs>
  );
}