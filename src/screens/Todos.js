import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const dummyTodos = [
  { id: '1', text: 'Buy groceries' },
  { id: '2', text: 'Finish React Native project' },
  { id: '3', text: 'Go for a morning jog' },
  { id: '4', text: 'Read 20 pages of a book' },
  { id: '5', text: 'Call mom' },
  { id: '6', text: 'Plan weekend trip' },
  { id: '7', text: 'Clean the kitchen' },
  { id: '8', text: 'Pay electricity bill' },
  { id: '9', text: 'Complete online course' },
  { id: '10', text: 'Write blog post' },
  { id: '11', text: 'Practice guitar' },
  { id: '12', text: 'Meditate for 10 minutes' },
  { id: '13', text: 'Organize closet' },
  { id: '14', text: 'Buy birthday gift for friend' },
  { id: '15', text: 'Water the plants' },
  { id: '16', text: 'Update resume' },
  { id: '17', text: 'Call the plumber' },
  { id: '18', text: 'Schedule dentist appointment' },
  { id: '19', text: 'Prepare dinner' },
  { id: '20', text: 'Respond to emails' },
  { id: '21', text: 'Walk the dog' },
  { id: '22', text: 'Plan holiday budget' },
  { id: '23', text: 'Backup phone data' },
  { id: '24', text: 'Read tech news' },
  { id: '25', text: 'Organize desktop files' },
];

export default function Todos() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Todo List</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {dummyTodos.map((todo, index) => (
          <View
            key={todo.id}
            style={[
              styles.todoCard,
              { backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#d9f0ff' },
            ]}
          >
            <Text style={styles.todoText}>{todo.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: '100%',
    // flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 20, // extra space for the floating button
  },
  todoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  todoText: {
    fontSize: 16,
    color: '#000',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
});
