import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Remove titles
        tabBarStyle: {
          backgroundColor: '#1a1a2e', // Dark blue background color for tab bar
          borderTopColor: 'transparent',
          paddingBottom: Platform.select({ ios: 10, default: 5 }),
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="FaceScan"
        options={{
          // tabBarIcon: ({ focused }) => (
          //   <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
          //     <FontAwesome name="smile-o" size={28} color={focused ? '#fff' : '#808080'} />
          //   </View>
          // ),
        }}
      />
      <Tabs.Screen
        name="Questionnaire"
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
        //       <FontAwesome name="clipboard" size={28} color={focused ? '#fff' : '#808080'} />
        //     </View>
        //   ),
        // }}
      />
      <Tabs.Screen
        name="Dashboard"
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
        //       <FontAwesome name="home" size={28} color={focused ? '#fff' : '#808080'} />
        //     </View>
        //   ),
        // }}
      />
      <Tabs.Screen
        name="Todos"
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
        //       <FontAwesome name="check-square" size={28} color={focused ? '#fff' : '#808080'} />
        //     </View>
        //   ),
        // }}
      />
      <Tabs.Screen
        name="HabitBuilder"
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
        //       <FontAwesome name="cogs" size={28} color={focused ? '#fff' : '#808080'} />
        //     </View>
        //   ),
        // }}
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
