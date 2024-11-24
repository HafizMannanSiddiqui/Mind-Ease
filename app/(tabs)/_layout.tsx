import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab'; // Retained
import TabBarBackground from '@/components/ui/TabBarBackground'; // Retained
import { useColorScheme } from '@/hooks/useColorScheme'; // Retained
import { FontAwesome } from '@expo/vector-icons';

// Ensure this import matches the structure of your navigation setup
import DashboardStack from '../navigation/AppNavigation'; // Retained and fixed path if needed

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
  <Tabs
  screenOptions={{
    tabBarShowLabel: true, // Show tab labels
    tabBarStyle: {
      backgroundColor: '#1a1a2e', // Dark blue background
      borderTopColor: 'transparent', // No border at the top
      paddingBottom: 2, // Ensure no additional padding interferes
      paddingTop: 3,
      paddingLeft: 5,
      paddingRight:5,
      marginBottom: 0, // Avoid spacing conflicts
      height: 65, // Explicitly set height
    },
  }}
>
      <Tabs.Screen
        name="FaceScan"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <FontAwesome name="smile-o" size={28} color={focused ? '#fff' : '#808080'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Questionnaire"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <FontAwesome name="clipboard" size={28} color={focused ? '#fff' : '#808080'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <FontAwesome name="home" size={28} color={focused ? '#fff' : '#808080'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Todos"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <FontAwesome name="check-square" size={28} color={focused ? '#fff' : '#808080'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="HabitBuilder"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <FontAwesome name="cogs" size={28} color={focused ? '#fff' : '#808080'} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    borderRadius: 12,
  },
  iconContainerFocused: {
    backgroundColor: '#87CEFA', // Light blue background when focused (hover/active state)
  },
});
