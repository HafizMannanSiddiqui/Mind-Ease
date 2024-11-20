import { useState, useEffect } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText'; // Adjusted for your project structure
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native'; // For navigation

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: string;
  duration: string;
  status: string;
  createdAt: Date;
  completedDays: number;
}

export default function HabitBuilder() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [newHabit, setNewHabit] = useState<Habit>({
    id: '',
    name: '',
    description: '',
    frequency: 'Daily',
    duration: '',
    status: 'Pending',
    createdAt: new Date(),
    completedDays: 0,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const navigation = useNavigation(); // Navigation hook

  const handleSaveHabit = () => {
    const { name, description, frequency, duration } = newHabit;

    if (!name || !description || !frequency || !duration) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const formattedDuration = `${duration} ${frequency === 'Days' ? 'days' : 'weeks'}`;
    const habitData = { ...newHabit, duration: formattedDuration };

    if (isUpdating) {
      setHabits((prevHabits) =>
        prevHabits.map((habit) => (habit.id === newHabit.id ? habitData : habit))
      );
      setIsUpdating(false);
    } else {
      const id = new Date().getTime().toString();
      setHabits((prevHabits) => [
        ...prevHabits,
        { ...habitData, id, createdAt: new Date(), completedDays: 0 },
      ]);
    }

    setIsModalVisible(false);
    setNewHabit({
      id: '',
      name: '',
      description: '',
      frequency: 'Daily',
      duration: '',
      status: 'Pending',
      createdAt: new Date(),
      completedDays: 0,
    });
  };

  const handleMarkAsCompleted = (habit: Habit) => {
    setHabits((prevHabits) =>
      prevHabits.map((h) =>
        h.id === habit.id ? { ...h, status: 'Completed', completedDays: h.completedDays + 1 } : h
      )
    );
  };

  const handleViewDetails = (habit: Habit) => {
    navigation.navigate('Todos', { habitDetails: habit }); // Redirect to Todos with habit details
  };

  const calculateRemainingDays = (habit: Habit) => {
    const durationInDays = parseInt(habit.duration.split(' ')[0], 10);
    return Math.max(0, durationInDays - habit.completedDays);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.pageTitle}>Habit Builder</ThemedText>

      <ScrollView style={styles.scrollView}>
        {habits.map((habit) => (
          <View key={habit.id} style={styles.habitTile}>
            <ThemedText type="default" style={styles.habitTitle}>Name: {habit.name}</ThemedText>
            <ThemedText type="default" style={styles.habitTitle}>Description: {habit.description}</ThemedText>
            <ThemedText type="caption" style={styles.habitDays}>
               ({habit.duration})
            </ThemedText>
            <ThemedText type="caption" style={styles.habitStatus}>
              Status: {habit.status}
            </ThemedText>
            <View style={styles.habitActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleMarkAsCompleted(habit)}
              >
                <FontAwesome name="check-circle" size={20} color="#28a745" />
                <ThemedText type="link" style={styles.actionText}>Mark as Completed</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleViewDetails(habit)}
              >
                <FontAwesome name="info-circle" size={20} color="#007bff" />
                <ThemedText type="link" style={styles.actionText}>View Details</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.newHabitButtonContainer}>
        <TouchableOpacity style={styles.newHabitButton} onPress={() => setIsModalVisible(true)}>
          <FontAwesome name="plus-circle" size={24} color="#fff" />
          <ThemedText type="link" style={styles.newHabitButtonText}>Create New Habit</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Habit Creation/Editing Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText type="title" style={styles.modalTitle}>
              {isUpdating ? 'Update Habit' : 'Create New Habit'}
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Habit Name"
              value={newHabit.name}
              onChangeText={(text) => setNewHabit({ ...newHabit, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newHabit.description}
              onChangeText={(text) => setNewHabit({ ...newHabit, description: text })}
            />
            <Picker
              selectedValue={newHabit.frequency}
              style={styles.picker}
              onValueChange={(itemValue) => setNewHabit({ ...newHabit, frequency: itemValue })}
            >
              <Picker.Item label="Days" value="Days" />
              <Picker.Item label="Weeks" value="Weeks" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Duration"
              keyboardType="numeric"
              value={newHabit.duration}
              onChangeText={(text) => setNewHabit({ ...newHabit, duration: text })}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveHabit}>
                <ThemedText type="link" style={styles.modalButtonText}>
                  {isUpdating ? 'Update Habit' : 'Add Habit'}
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                <ThemedText type="link" style={styles.modalButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  pageTitle: {
    color: '#002366',
    fontSize: 24,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  habitTile: {
    backgroundColor: '#C3E4F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  habitTitle: {
    color: '#002366',
    fontSize: 18,
    marginBottom: 8,
  },
  habitDays: {
    color: '#003f5c',
    fontSize: 14,
    marginBottom: 8,
  },
  habitDuration: {
    color: '#003f5c',
    fontSize: 14,
    marginBottom: 12,
  },
  habitActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#007bff',
    marginLeft: 8,
  },
  newHabitButtonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  newHabitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002366',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  newHabitButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
  },
});
