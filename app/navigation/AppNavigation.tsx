// app/navigation/AppNavigation.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import Dashboard from '../(tabs)/Dashboard';
import ProfileScreen from '../ProfileScreen';
import HabitBuilder from '../(tabs)/HabitBuilder';
import Todos from '../(tabs)/Todos';

// Define the RootStackParamList for type safety
export type RootStackParamList = {
  Dashboard: undefined;
  ProfileScreen: undefined;
  HabitBuilder: undefined;
  Todos: undefined;
};

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function HabitBuilderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HabitBuilder" component={HabitBuilder} />
      <Stack.Screen name="Todos" component={Todos} />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="DashboardTab" component={DashboardStack} />
          <Tab.Screen name="HabitBuilderTab" component={HabitBuilderStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  