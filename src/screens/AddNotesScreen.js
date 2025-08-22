// AddNotesScreen.js
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddNotesScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const currentDate = new Date().toLocaleDateString();

  const handleAddNote = () => {
    console.log({ title, description, author, date: currentDate });
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
        {/* Date + Character Counter */}
        <View style={styles.dateRow}>
          <View style={styles.dateBox}>
            <Ionicons name="calendar" size={18} color="#4F46E5" />
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
          {/* <Text style={styles.charCounter}>{description.length}/300</Text> */}
        </View>

        {/* Title */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#9CA3AF"
        />

        {/* Description */}
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textAreaInput}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.textAreaCounter}>{description.length} characters</Text>
        </View>

        {/* Author */}
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
          placeholderTextColor="#9CA3AF"
        />

        {/* Add Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddNote}>
          <Text style={styles.buttonText}>Add Now</Text>
        </TouchableOpacity>
      </View>
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
  charCounter: {
    fontSize: 13,
    color: "#6B7280",
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
});
