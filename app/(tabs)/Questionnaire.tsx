import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation';  // Import your navigation types
import questionsData from '../questions'; // Import the questions data


import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the types for the options and questions
interface Option {
  text: string;
  score: number;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

// Use the correct type for navigation
//type QuestionnaireScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Questionnaire'>;

export default function Questionnaire() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  
  //const navigation = useNavigation<QuestionnaireScreenNavigationProp>();  // Type the navigation hook

  const currentQuestion = questionsData[currentQuestionIndex];

  const handleAnswerSelection = (option: Option, questionIndex: number) => {
    const newScore = score + option.score;
    setScore(newScore);

    // Update the selected option
    setSelectedOption(option);

    // Move to the next question or show the score if it's the last question
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert(`Quiz complete! Your score is ${newScore.toString()}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <FontAwesome name="arrow-left" size={24} color="#1D3557"  />
        {/* Back Button to go to Dashboard */}
        {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
          <FontAwesome name="arrow-left" size={24} color="#1D3557" />
        </TouchableOpacity> */}
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.profileIcon}
        />
      </View>

      <Text style={styles.title}>Let's get to know you</Text>
      <Text style={styles.subtitle}>
        Please answer the following to help us understand your mental state better.
      </Text>

      {/* Display the current question number out of total */}
      <Text style={styles.questionProgress}>
        Question {currentQuestionIndex + 1} / {questionsData.length}
      </Text>

      <View style={styles.questionBox}>
        <Text style={styles.questionNumber}>Q {currentQuestion.id}</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption?.text === option.text && styles.selectedOption
          ]}
          onPress={() => handleAnswerSelection(option, currentQuestion.id)}
        >
          <View style={styles.radioCircle}>
            {selectedOption?.text === option.text && <View style={styles.selectedCircle} />}
          </View>
          <Text style={styles.optionText}>{option.text}</Text>
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
  questionProgress: {
    fontSize: 16,
    color: '#003f5c',
    marginTop: 8,
    textAlign: 'center',
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
