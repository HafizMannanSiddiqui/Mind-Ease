import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for icons
import { Link, router } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, OAuthProvider, signInWithCredential } from 'firebase/auth';
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
  measurementId: "G-FBS9T624TM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Email/Password Sign-In
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully!');
      router.push('/(tabs)/Dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Sign-In failed.');
      } else {
        Alert.alert('Error', 'Sign-In failed.');
      }
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email to reset the password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent. Check your inbox.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Failed to send password reset email.');
      } else {
        Alert.alert('Error', 'Failed to send password reset email.');
      }
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const [request, response, promptAsync] = GoogleAuthSession.useIdTokenAuthRequest({
        clientId: "YOUR_GOOGLE_CLIENT_ID",
      });

      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
        Alert.alert('Success', 'Signed in with Google!');
      } else {
        Alert.alert('Error', 'Google Sign-In failed.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Google Sign-In failed.');
      } else {
        Alert.alert('Error', 'Google Sign-In failed.');
      }
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

      const provider = new OAuthProvider('apple.com');
      const idToken = credential.identityToken;
      if (idToken) {
        const authCredential = provider.credential({ idToken });
        await signInWithCredential(auth, authCredential);
        Alert.alert('Success', 'Signed in with Apple!');
      } else {
        Alert.alert('Error', 'Apple Sign-In failed: No ID token.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Apple Sign-In failed.');
      } else {
        Alert.alert('Error', 'Apple Sign-In failed.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoogleSignIn} style={[styles.button, styles.googleButton]}>
          <FontAwesome name="google" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>

        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          style={styles.appleButton}
          onPress={handleAppleSignIn}
        />

        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotButton}>
          <Text style={styles.forgotButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Don't have an account?{' '}
          <Link href="/(auth)/signUp" style={styles.loginLink}>
            Register
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
  input: {
    borderWidth: 1,
    borderColor: '#5AA9E6', // Subtle blue for borders
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#002366',
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
  forgotButton: {
    marginTop: 10,
  },
  forgotButtonText: {
    color: '#2563eb',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#DB4437', // Google red
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
    color: '#2563eb',
    fontWeight: 'bold',
  },
});
