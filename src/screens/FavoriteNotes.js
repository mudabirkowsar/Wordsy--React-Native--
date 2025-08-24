import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  Modal,
  Vibration,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const DUMMY_HAPTIC_DURATION = 20;

// Dummy favorite notes
const dummyFavoriteNotes = [
  {
    id: "1",
    title: "Shopping List",
    description: "Milk, Eggs, Bread, Coffee",
    author: "John",
    currentDate: "2025-08-24 10:45 AM",
    favorite: true,
    pinned: false,
  },
  {
    id: "2",
    title: "Work Tasks",
    description: "Finish React Native project, call client, send report",
    author: "Jane",
    currentDate: "2025-08-24 11:15 AM",
    favorite: true,
    pinned: true,
  },
];

export default function FavoriteNotes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    // For now, load dummy favorite notes
    setNotes(dummyFavoriteNotes);
  }, []);

  const handleLongPress = (note) => {
    Vibration.vibrate(DUMMY_HAPTIC_DURATION);
    setSelectedNote(note);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>❤️ Favorite Notes</Text>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.container,
          notes.length === 0 && { flex: 1, justifyContent: "center" },
        ]}
        renderItem={({ item, index }) => (
          <Pressable
            onLongPress={() => handleLongPress(item)}
            onPress={() => navigation.navigate("EditNote", { note: item })}
          >
            <View
              style={[
                styles.card,
                {
                  backgroundColor: item.pinned
                    ? "#fffacd"
                    : index % 2 === 0
                    ? "#f0f0f0"
                    : "#d9f0ff",
                },
              ]}
            >
              <View style={styles.titleRow}>
                <Text style={styles.title}>
                  {item.title} {item.pinned ? "📌" : ""}
                </Text>
                {item.favorite && (
                  <Ionicons name="heart" size={20} color="red" />
                )}
              </View>

              <Text
                style={styles.description}
                numberOfLines={4}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>

              {/* Author + Date Row */}
              <View style={styles.authorDateRow}>
                <Text style={styles.authorText}>
                  {item.author || "Unknown"}
                </Text>
                <Text style={styles.date}>{item.currentDate}</Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.book}>📚</Text>
            <Text style={styles.emptyText}>
              No favorite notes yet. Add some!
            </Text>
          </View>
        }
      />

      {/* Long Press Options Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedNote?.title}</Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("EditNote", { note: selectedNote });
              }}
              style={styles.modalButton}
            >
              <Ionicons name="create-outline" size={20} color="#000" />
              <Text style={styles.modalButtonText}>Edit Note</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    margin: 10,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginVertical: 8,
    width: "95%",
    alignSelf: "center",
    elevation: 3,
    backgroundColor: "#fff",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  authorDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  authorText: {
    fontSize: 12,
    color: "#555",
    fontStyle: "italic",
  },
  date: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  modalButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
  },
  book: {
    fontSize: 36,
    marginBottom: 20,
  },
});
