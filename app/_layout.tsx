// app/_layout.tsx

// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function _layout() {
  // const colorScheme = useColorScheme();
  // const [fontsLoaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Include the tabs layout */}
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
       <Stack.Screen name='(auth)' options={{headerShown:false}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        
        
      </Stack>
      // <StatusBar style="auto" />
    // </ThemeProvider>
  );
}
