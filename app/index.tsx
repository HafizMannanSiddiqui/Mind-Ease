import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator } from 'react-native'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { router } from 'expo-router';
const brain = require('../assets/images/brain.png');


export default function SplashScreen() {
  // const [fontsLoaded] = useFonts({
  //   'Inter-Regular': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
  //   'Inter-Medium': require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
  // })

  // if (!fontsLoaded) {
  //   return null
  // }
  useEffect(() => {
    setTimeout(() => {
      router.push('/(auth)/signIn');
  },3000)
  },[])

  return (
    <LinearGradient
      colors={['#B7E3FF', '#4B92FF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        <Image
          source={brain}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>MindEase</Text>
        <Text style={styles.subtitle}>Explore the World of Ease</Text>
        <Text style={styles.description}>Track your self to remain healthy and fit</Text>
        <Text style={styles.smallText}>Your personal Doctor !</Text>
        <ActivityIndicator style={styles.spinner} size="large" color="#fff" />
      </View>
    </LinearGradient>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Medium',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#000',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#333',
    marginBottom: 40,
  },
  spinner: {
    position: 'absolute',
    bottom: 40,
  },
})