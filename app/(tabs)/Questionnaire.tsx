import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';

export default function Questionnaire() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#1D3557" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.profileIcon}
        />
      </View>

      <ThemedText type="title" style={styles.title}>Let's get to know you</ThemedText>
      <Text style={styles.subtitle}>
        Please answer the following to help us understand your mental state better.
      </Text>

      <View style={styles.questionBox}>
        <Text style={styles.questionNumber}>Q no: 1</Text>
        <Text style={styles.questionText}>How was your day?</Text>
      </View>

      {["Good", "Normal", "Bad", "Worst"].map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            index === 1 && styles.selectedOption
          ]}
        >
          <View style={styles.radioCircle}>
            {index === 1 && <View style={styles.selectedCircle} />}
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#002366',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#003f5c',
    marginTop: 8,
  },
  questionBox: {
    backgroundColor: '#002147',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  questionNumber: {
    color: '#D9D9D9',
    fontSize: 14,
    marginBottom: 5,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C3E4F8',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#5AA9E6',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#87CEFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#002147',
  },
  optionText: {
    fontSize: 16,
    color: '#002366',
  },
});
