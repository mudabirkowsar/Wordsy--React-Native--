import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addNote } from "../../asyncStorage/Storage";

const AddNotesScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [warning, setWarning] = useState(""); 
  const [successModal, setSuccessModal] = useState(false); // ✅ Success modal state

  const currentDate = new Date().toLocaleDateString();

  const handleAddNote = () => {
    if (!title || !description || !author) {
      setWarning("⚠️ All fields are required");
      return;
    }

    setWarning("");
    const id = Date.now().toString();
    addNote({ id, title, description, author, currentDate });

    // ✅ Show success modal
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.goBack(); // go back after success
    }, 1500);

    setTitle("");
    setDescription(""); 
    setAuthor("");
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.heading}>Add a New Note</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Date */}
        <View style={styles.dateRow}>
          <View style={styles.dateBox}>
            <Ionicons name="calendar" size={18} color="#4F46E5" />
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        </View>

        {/* Title */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setWarning("");
          }}
          placeholderTextColor="#9CA3AF"
        />

        {/* Description */}
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textAreaInput}
            placeholder="Description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setWarning("");
            }}
            multiline
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.textAreaCounter}>
            {description.length} characters
          </Text>
        </View>

        {/* Author */}
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={(text) => {
            setAuthor(text);
            setWarning("");
          }}
          placeholderTextColor="#9CA3AF"
        />

        {/* Warning Message */}
        {warning ? <Text style={styles.warning}>{warning}</Text> : null}

        {/* Add Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddNote}>
          <Text style={styles.buttonText}>Add Now</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Success Modal */}
      <Modal
        visible={successModal}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={50} color="#4CAF50" />
            <Text style={styles.modalText}>Note Added Successfully!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddNotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#4B5563",
    marginLeft: 5,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 15,
    color: "#111827",
  },
  textAreaContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 150,
    marginBottom: 15,
    padding: 12,
    position: "relative",
  },
  textAreaInput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: "top",
    color: "#111827",
  },
  textAreaCounter: {
    position: "absolute",
    right: 12,
    bottom: 8,
    fontSize: 12,
    color: "#6B7280",
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  warning: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
  // ✅ Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
