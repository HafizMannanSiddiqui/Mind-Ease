import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';  // Keep this, it's used for routing.

export default function _layout() {
  return (
    <>
      <Stack>
        {/* Define your screen routes here */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" options={{ headerShown: true }} />
        <Stack.Screen name="FScanning" options={{ headerShown: true }} />
      </Stack>

      {/* Status bar */}
      <StatusBar style="auto" />
    </>
  );
}
