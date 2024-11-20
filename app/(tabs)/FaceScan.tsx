import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function FaceScan() {
  const router = useRouter();

  const handleProceed = () => {
    router.push("/FScanning");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Your Face</Text>
      <Text style={styles.subtitle}>
        Let us analyze your expressions to better understand your current mood.
      </Text>
      <View style={styles.faceIconContainer}>
        <FontAwesome name="smile-o" size={60} color="#002366" />
      </View>
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA', // Light sky blue background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002366', // Deep blue for title
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#003f5c', // Deep blue for subtitle text
    textAlign: 'center',
    marginBottom: 30,
  },
  faceIconContainer: {
    backgroundColor: '#C3E4F8', // Light blue background for the icon container
    borderRadius: 100,
    padding: 30,
    marginBottom: 40,
  },
  proceedButton: {
    backgroundColor: '#5AA9E6', // Blue for proceed button
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  proceedText: {
    color: '#FFFFFF', // White text for button
    fontSize: 16,
    fontWeight: 'bold',
  },
});
