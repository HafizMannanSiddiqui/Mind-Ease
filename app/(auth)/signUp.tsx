import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Link } from 'expo-router';

export default function Component() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleSignUp = async () => {
    // try {
    //   const response = await fetch('http:///192.168.43.179:5000/api/auth/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({

    //       email,
    //       name,
    //       password,

    //     })
    //   });
    //   console.log(response);
    //   const data = await response.json();

    //   if (response.ok) {
    //     console.log('Sign up successful:', data);
    //     Alert.alert('Success', 'Account created successfully!');
    //     router.push('/signIn');
    //   } else {
    //     console.error('Sign up failed:', data);
    //     Alert.alert('Error', data.message || 'Failed to sign up.');
    //   }
    // } catch (error) {
    //   console.error('Error during sign up:', error);
    //   Alert.alert('Error', 'An error occurred. Please try again.');
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          value={name}
          onChangeText={setName}
        />

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

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Gender"
          value={gender}
          onChangeText={setGender}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account? <Link style={styles.loginLink} href="/(auth)/signIn">Login</Link>
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
