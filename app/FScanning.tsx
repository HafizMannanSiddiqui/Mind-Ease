import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export default function FScanning() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPermissionRequested, setIsPermissionRequested] = useState(false); 
  const navigation = useNavigation();

  const handleRequestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    setIsPermissionRequested(true); 
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setProgress(0);
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsScanning(false);
          navigation.goBack(); // Return to the previous screen or show success
        }
        return prev + 10;
      });
    }, 500);
  };

  // If permission is requested but not granted, show the error message
  if (isPermissionRequested && hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Face Scanning</Text>
      </View>

      {/* Camera Preview */}
      {hasPermission && (
        <Camera style={styles.camera} type={Camera.Type.front} />
      )}

      {/* Scan Progress and Button */}
      <View style={styles.scanContainer}>
        {isScanning ? (
          <View style={styles.progressContainer}>
            <ActivityIndicator size="large" color="#4EA8F4" />
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        ) : (
          <>
            {!isPermissionRequested ? (
              <TouchableOpacity style={styles.proceedButton} onPress={handleRequestPermission}>
                <Text style={styles.proceedText}>Proceed</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.scanButton} onPress={handleStartScan}>
                <Text style={styles.scanText}>Start Scan</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2FA',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 20,
    color: '#1D3557',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002366',
  },
  camera: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  scanContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  proceedButton: {
    backgroundColor: '#5AA9E6',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 10,
  },
  proceedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#4EA8F4',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  scanText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4EA8F4',
  },
});
