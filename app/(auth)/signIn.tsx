import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';
export default function Component() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignIn = async () => {
    // console.log("inside signin")
    // try {
    //   const response = await fetch('http:///192.168.43.179:5000/api/auth/signin', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     console.log('Login successful:', data);
    //     // Save the token in AsyncStorage or your preferred storage
    //     // await AsyncStorage.setItem('userToken', data.token);
    //     router.push('/home'); // Redirect to a logged-in page
    //   } else {
    //     console.error('Login failed:', data);
    //     // Alert.alert('Error', data.message || 'Failed to log in.');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   // Alert.alert('Error', 'An error occurred. Please try again.');
    // }
    router.push('/(tabs)/Dashboard');

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>



        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />



        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Don't have an account? <Link href='/(auth)/signUp' style={styles.loginLink}>SingUp</Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1e3a8a',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#60a5fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4b5563',
  },
  loginLink: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
});