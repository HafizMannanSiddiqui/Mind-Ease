import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

export default function Dashboard() {
  const progress = 95;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={40} color="#FFFFFF" />
        <View style={styles.headerText}>
          <Text style={styles.userName}>Hi, John Doe</Text>
          <Text style={styles.date}>18 Oct, 2024</Text>
        </View>
        <Ionicons name="search-outline" size={24} color="#FFFFFF" style={styles.searchIcon} />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        {/* Daily Task */}
        <View style={styles.taskCard}>
          <View style={styles.taskContent}>
            <View style={styles.textAndButton}>
              <Text style={styles.cardText}>Your daily task almost done</Text>
              <View style={styles.buttonWrapper}>
                <Text style={styles.viewTaskButton}>View Task</Text>
              </View>
            </View>
            <View style={styles.circularProgress}>
              <CircularProgressBar progress={progress} />
            </View>
          </View>
        </View>

        {/* Today's Task */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Task</Text>
            <Text style={styles.sectionLink}>See All</Text>
          </View>
          <View style={styles.taskPlaceholder}></View>
        </View>

        {/* Upcoming Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
            <Text style={styles.sectionLink}>See All</Text>
          </View>
          <View style={styles.upcomingTask}>
            <Ionicons name="calendar-outline" size={28} color="#FFFFFF" />
            <View style={styles.upcomingTaskText}>
              <Text style={styles.taskText}>Meditation for 30 minutes</Text>
              <Text style={styles.taskDate}>23 Oct, 2024</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Circular Progress Bar
const CircularProgressBar = ({ progress }) => {
  const strokeWidth = 6;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <Svg width={90} height={90}>
      <Circle cx="45" cy="45" r={radius} stroke="#B4D3FF" strokeWidth={strokeWidth} fill="none" />
      <Circle
        cx="45"
        cy="45"
        r={radius}
        stroke="#5AA9E6"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={progressOffset}
        fill="none"
        transform="rotate(-90 45 45)"
      />
      <Text
        x="45"
        y="45"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#FFFFFF"
      >
        {`${progress}%`}
      </Text>
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 12,
  },
  userName: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  date: {
    color: '#002366',
    fontSize: 12,
    fontWeight: '400',
  },
  searchIcon: {
    marginLeft: 'auto',
  },
  mainContent: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: '#002147',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  taskContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAndButton: {
    flex: 1,
    marginRight: 10,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  buttonWrapper: {
    backgroundColor: '#5AA9E6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  viewTaskButton: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 14,
  },
  circularProgress: {
    flexShrink: 0,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionLink: {
    color: '#5AA9E6',
    fontSize: 12,
    fontWeight: '500',
  },
  taskPlaceholder: {
    backgroundColor: '#BFD4F9',
    borderRadius: 16,
    height: 80,
  },
  upcomingTask: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5AA9E6',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  upcomingTaskText: {
    marginLeft: 12,
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  taskDate: {
    color: '#E8F3FF',
    fontSize: 12,
    fontWeight: '400',
  },
});
