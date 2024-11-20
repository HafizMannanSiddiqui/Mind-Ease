import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; // Replace with your Text component
import { ThemedView } from '@/components/ThemedView'; // Replace with your View component
import { FontAwesome } from '@expo/vector-icons';

// Sample initial tasks
const initialTasks = [
  { name: 'Task 1', date: '2024-11-05', status: 'completed', maxStreak: 5, currentStreak: 3, target: 10 },
  { name: 'Task 2', date: '2024-12-10', status: 'missed', maxStreak: 2, currentStreak: 1, target: 5 },
  { name: 'Task 3', date: '2025-01-15', status: 'completed', maxStreak: 7, currentStreak: 5, target: 15 },
  { name: 'Task 4', date: '2025-02-20', status: 'missed', maxStreak: 4, currentStreak: 2, target: 8 },
];

// Helper to get the number of days in a month
const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

interface Task {
  name: string;
  date: string;
  status: string;
  maxStreak: number;
  currentStreak: number;
  target: number;
}

interface TaskTileProps {
  task: Task;
  onStatusChange: (taskName: string, newStatus: string) => void;
}

function TaskTile({ task, onStatusChange }: TaskTileProps) {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onStatusChange(task.name, newStatus);
  };

  return (
    <ThemedView style={styles.taskTile}>
      <ThemedText type="title" style={styles.taskName}>{task.name}</ThemedText>
      <ThemedText type="caption" style={styles.date}>
        Today's Date: {new Date().toLocaleDateString()}
      </ThemedText>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.statusButton, status === 'completed' && styles.completedButton]}
          onPress={() => handleStatusChange('completed')}
        >
          <ThemedText type="button" style={styles.buttonText}>Completed</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusButton, status === 'missed' && styles.missedButton]}
          onPress={() => handleStatusChange('missed')}
        >
          <ThemedText type="button" style={styles.buttonText}>Missed</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskIndex, setTaskIndex] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date(initialTasks[taskIndex].date).getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date(initialTasks[taskIndex].date).getFullYear());

  const currentTask = tasks[taskIndex];
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    new Date(1970, 0, i + 4).toLocaleDateString(undefined, { weekday: 'short' })
  );

  const changeTask = (direction: string) => {
    const newIndex = direction === 'next'
      ? (taskIndex + 1) % tasks.length
      : (taskIndex - 1 + tasks.length) % tasks.length;
    setTaskIndex(newIndex);

    const taskDate = new Date(tasks[newIndex].date);
    setCurrentMonth(taskDate.getMonth() + 1);
    setCurrentYear(taskDate.getFullYear());
  };

  const handleStatusChange = (taskName: string, newStatus: string) => {
    const updatedTasks = tasks.map((task) =>
      task.name === taskName ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const formatDate = (day: number) => `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.taskNavigation}>
        <TouchableOpacity onPress={() => changeTask('prev')}>
          <FontAwesome name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.taskTitle}>{currentTask.name}</ThemedText>
        <TouchableOpacity onPress={() => changeTask('next')}>
          <FontAwesome name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarHeader}>
        <ThemedText type="default" style={styles.monthYear}>
          {new Date(currentYear, currentMonth - 1).toLocaleString(undefined, { month: 'long' })} {currentYear}
        </ThemedText>
      </View>

      <View style={styles.daysContainer}>
        {daysOfWeek.map((day, index) => (
          <ThemedText key={index} type="default" style={styles.day}>
            {day}
          </ThemedText>
        ))}
      </View>

      <View style={styles.datesContainer}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const formattedDate = formatDate(day);
          const isDueDate = formattedDate === currentTask.date;
          const isMissed = tasks.some((task) => task.date === formattedDate && task.status === 'missed');
          return (
            <View
              key={day}
              style={[
                styles.dateBox,
                isDueDate && (isMissed ? styles.missedDate : styles.completedDate),
              ]}
            >
              <ThemedText type="default" style={styles.dateText}>{day}</ThemedText>
            </View>
          );
        })}
      </View>

      <TaskTile task={currentTask} onStatusChange={handleStatusChange} />

      <View style={styles.taskDetails}>
        <ThemedText type="subtitle" style={styles.taskTileText}>Task: {currentTask.name}</ThemedText>
        <ThemedText type="caption" style={styles.taskTileText}>Due Date: {currentTask.date}</ThemedText>
        <ThemedText type="caption" style={styles.taskTileText}>Target: {currentTask.target} completions</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA', // Light sky blue background
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  taskNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskTile: {
    backgroundColor: '#C3E4F8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  taskName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002366',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#003f5c',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  completedButton: {
    backgroundColor: '#28A745',
  },
  missedButton: {
    backgroundColor: '#DC3545',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#002147', // Dark blue for the title background
    borderRadius: 12,
    padding: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#002147', // Dark blue for the header
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  monthYear: {
    fontSize: 18,
    color: '#FFFFFF', // White for the month and year text
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  day: {
    fontSize: 14,
    color: '#002366', // Deep blue for day labels
    flex: 1,
    textAlign: 'center',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateBox: {
    width: '13%',
    backgroundColor: '#C3E4F8', // Light blue for non-marked dates
    borderRadius: 4,
    paddingVertical: 8,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#87CEFA', // Sky blue border
  },
  completedDate: {
    backgroundColor: '#28A745', // Green for completed dates
    borderColor: '#28A745',
  },
  missedDate: {
    backgroundColor: '#DC3545', // Red for missed dates
    borderColor: '#DC3545',
  },
  dateText: {
    fontSize: 14,
    color: '#002366', // Deep blue for date text
  },
  taskDetails: {
    backgroundColor: '#C3E4F8', // Light blue background
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  taskTileText: {
    fontSize: 16,
    color: '#002366', // Deep blue for task detail text
    marginBottom: 4,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C3E4F8', // Light blue for options
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#5AA9E6', // Blue for selected option
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#87CEFA', // Sky blue for the radio border
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#002147', // Dark blue for selected radio circle
  },
  optionText: {
    fontSize: 16,
    color: '#002366', // Deep blue for option text
  },
});
