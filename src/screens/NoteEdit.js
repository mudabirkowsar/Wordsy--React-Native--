import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { updateNote } from "../../asyncStorage/Storage";

export default function NoteEdit({ route, navigation }) {
  const { note } = route.params;

  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const [warningVisible, setWarningVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      setWarningVisible(true);
      return;
    }

    updateNote(note.id, {
      id: note.id,
      title,
      description,
      author: note.author,
      currentDate: note.currentDate,
    });

    setSuccessVisible(true);

    // Hide success modal after 2 seconds and go back
    setTimeout(() => {
      setSuccessVisible(false);
      navigation.goBack();
    }, 2000);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.iconButton}>
          <Ionicons name="close" size={28} color="#555" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Note</Text>

        <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
          <Ionicons name="checkmark" size={28} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Title Input */}
      <View style={styles.inputCard}>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter note title"
          placeholderTextColor="#999"
        />
      </View>

      {/* Description Input */}
      <View style={[styles.inputCard, { flex: 1 }]}>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter note description"
          placeholderTextColor="#999"
          multiline
        />
        <Text style={styles.charCount}>{description.length} characters</Text>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      {/* Warning Modal */}
      <Modal
        visible={warningVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setWarningVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="warning" size={30} color="red" />
            <Text style={styles.modalText}>All fields are required!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setWarningVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={successVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
            <Text style={styles.modalText}>Note updated successfully!</Text>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  iconButton: {
    padding: 5,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  descriptionInput: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "right",
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
  },
  modalButton: {
    marginTop: 15,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
