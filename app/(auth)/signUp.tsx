import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Link } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import * as GoogleAuthSession from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBpz4fY9nw8kcbdHm-eB1VsVOgvy_gM1W0",
  authDomain: "mind-ease-a6263.firebaseapp.com",
  projectId: "mind-ease-a6263",
  storageBucket: "mind-ease-a6263.firebasestorage.app",
  messagingSenderId: "625591827776",
  appId: "1:625591827776:web:7f05a2f24da0c016eb0ea5",
  measurementId: "G-FBS9T624TM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false); // New state to track sign-up

  // Handle Sign Up
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // After sign-up, set the display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name, // Set the display name
        });
      }

      // Mark the user as signed up
      setIsSignedUp(true);

      Alert.alert('Success', 'Account created successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign up.');
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    const [request, response, promptAsync] =
      GoogleAuthSession.useIdTokenAuthRequest({
        clientId: "YOUR_GOOGLE_CLIENT_ID",
      });

    if (response?.type === 'success') {
      try {
        const credential = GoogleAuthProvider.credential(response.params.id_token);
        await signInWithCredential(auth, credential);
        Alert.alert('Success', 'Signed in with Google!');
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Google Sign-In failed.');
      }
    } else {
      Alert.alert('Error', 'Google Sign-In failed.');
    }
  };

  // Apple Sign-In
  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const idToken = credential.identityToken!;
      const authCredential = GoogleAuthProvider.credential(idToken);

      await signInWithCredential(auth, authCredential);
      Alert.alert('Success', 'Signed in with Apple!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Apple Sign-In failed.');
    }
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
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleSignIn}
        >
          <Text style={styles.buttonText}>Sign Up with Google</Text>
        </TouchableOpacity>

        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          style={styles.appleButton}
          onPress={handleAppleSignIn}
        />

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Link style={styles.loginLink} href="/(auth)/signIn">
            Login
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002366', // Dark blue for text emphasis
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555', // Lighter text color for labels
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#5AA9E6', // Subtle blue for borders
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#002366',
    backgroundColor: '#fff', // White input background
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002147', // Dark blue for button
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: '#DB4437', // Google red
    marginTop: 10,
  },
  appleButton: {
    marginTop: 10,
    height: 50,
    width: '100%',
  },
  buttonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4b5563',
  },
  loginLink: {
    color: '#2563eb', // Blue link color for login
    fontWeight: 'bold',
  },
});
