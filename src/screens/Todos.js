import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const initialTodos = [
  { id: '1', text: 'Buy groceries', done: false, createdAt: new Date() },
  { id: '2', text: 'Finish React Native project', done: false, createdAt: new Date() },
  { id: '3', text: 'Go for a morning jog', done: false, createdAt: new Date() },
  { id: '4', text: 'Read 20 pages of a book', done: false, createdAt: new Date() },
  { id: '5', text: 'Call mom', done: false, createdAt: new Date() },
  { id: '6', text: 'Plan weekend trip', done: false, createdAt: new Date() },
  { id: '7', text: 'Clean the kitchen', done: false, createdAt: new Date() },
];

export default function Todos() {
  const [todos, setTodos] = useState(initialTodos);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editText, setEditText] = useState('');

  // Add new todo
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const todo = {
      id: (todos.length + 1).toString(),
      text: newTodo,
      done: false,
      createdAt: new Date(),
    };

    setTodos([todo, ...todos]);
    setNewTodo('');
    setModalVisible(false);
  };

  // Toggle checkbox
  const toggleTodoDone = (todoId) => {
    setTodos(
      todos.map((t) =>
        t.id === todoId ? { ...t, done: !t.done } : t
      )
    );
  };

  // Open view modal
  const handleOpenTodo = (todo) => {
    setSelectedTodo(todo);
    setEditText(todo.text);
    setViewModalVisible(true);
  };

  // Delete selected todo
  const handleDeleteTodo = () => {
    setTodos(todos.filter((t) => t.id !== selectedTodo.id));
    setViewModalVisible(false);
  };

  // Save edited todo
  const handleEditTodo = () => {
    if (editText.trim() === '') return;
    setTodos(
      todos.map((t) =>
        t.id === selectedTodo.id ? { ...t, text: editText } : t
      )
    );
    setViewModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>My Todo List</Text> */}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {todos.map((todo, index) => (
          <Pressable
            key={todo.id}
            onPress={() => handleOpenTodo(todo)}
            style={[
              styles.todoCard,
              { backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#d9f0ff' },
            ]}
          >
            <View style={styles.todoRow}>
              {/* Checkbox */}
              <TouchableOpacity
                onPress={() => toggleTodoDone(todo.id)}
                style={[
                  styles.checkbox,
                  { backgroundColor: todo.done ? '#000' : '#fff' },
                ]}
              >
                {todo.done && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>

              {/* Todo text */}
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.todoText,
                    { textDecorationLine: todo.done ? 'line-through' : 'none' },
                  ]}
                >
                  {todo.text}
                </Text>

                {/* Display creation time */}
                <Text style={styles.todoDate}>
                  Added: {todo.createdAt.toLocaleDateString()} - {todo.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Entypo name="add-to-list" color="#fff" size={24} />
      </TouchableOpacity>

      {/* Add Todo Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Todo</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter todo"
              value={newTodo}
              onChangeText={setNewTodo}
              placeholderTextColor="#999"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#f0f0f0' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: '#333' }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#000' }]}
                onPress={handleAddTodo}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* View/Edit Todo Modal */}
      <Modal
        visible={viewModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setViewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Todo</Text>
            <TextInput
              style={styles.input}
              value={editText}
              onChangeText={setEditText}
              placeholderTextColor="#999"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#f0f0f0' }]}
                onPress={handleDeleteTodo}
              >
                <Text style={[styles.modalButtonText, { color: 'red' }]}>
                  Delete
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#000' }]}
                onPress={handleEditTodo}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  todoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    color: '#000',
  },
  todoDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
