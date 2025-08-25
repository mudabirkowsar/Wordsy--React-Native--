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
import { deleteNote, toggleFavoriteNote, hideNote, getFavoriteNotes, searchNotes } from "../../asyncStorage/Storage";

const DUMMY_HAPTIC_DURATION = 20;

export default function FavoriteNotes({searchQuery}) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [favoriteModalVisible, setFavoriteModalVisible] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [hideModalVisible, setHideModalVisible] = useState(false);

  const navigation = useNavigation();

  // 🔹 Fetch Favorite notes function

  const fetchFavoirtenotes = async () => {
    try {
      const data = await getFavoriteNotes();
      setNotes(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchFavoirtenotes();
  }, []);

  const handleLongPress = (note) => {
    Vibration.vibrate(DUMMY_HAPTIC_DURATION);
    setSelectedNote(note);
    setModalVisible(true);
  };

  const handleAction = (action) => {
    setModalVisible(false);
    if (action === "pin") {
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((n) =>
          n.id === selectedNote.id ? { ...n, pinned: !n.pinned } : n
        );
        updatedNotes.sort((a, b) => {
          if (a.pinned === b.pinned) return 0;
          return a.pinned ? -1 : 1;
        });
        return updatedNotes;
      });
    } else if (action === "edit") {
      navigation.navigate("EditNote", { note: selectedNote });
    } else if (action === "delete") {
      deleteNote(selectedNote.id).then(() => {
        fetchFavoirtenotes();
        setSuccessModalVisible(true);
        setTimeout(() => setSuccessModalVisible(false), 1500);
      });
    } else if (action === "hide") {
      hideNote(selectedNote.id).then(() => {
        fetchFavoirtenotes();
        setHideModalVisible(true); // ✅ show modal
        setTimeout(() => setHideModalVisible(false), 1500);
      });
    } else if (action === "favorite") {
      toggleFavoriteNote(selectedNote.id).then(() => {
        fetchFavoirtenotes();
        setFavoriteMessage(
          selectedNote.favorite
            ? "Removed from Favorites"
            : "Added to Favorites"
        );
        setFavoriteModalVisible(true);
        setTimeout(() => setFavoriteModalVisible(false), 1500);
      });
    }
  };


  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite Notes ❤️</Text>
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
                {item.favorite && <Ionicons name="heart" size={20} color="red" />}
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
                <Text style={styles.authorText}>{item.author || "Unknown"}</Text>
                <Text style={styles.date}>{item.currentDate}</Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.book}>📚</Text>
            <Text style={styles.emptyText}>No notes found. Add one to get started!</Text>
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
              onPress={() => handleAction("pin")}
              style={styles.modalButton}
            >
              <Ionicons
                name={
                  selectedNote?.pinned
                    ? "remove-circle-outline"
                    : "pin-outline"
                }
                size={20}
                color="#000"
              />
              <Text style={styles.modalButtonText}>
                {selectedNote?.pinned ? "Unpin Note" : "Pin Note"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAction("edit")}
              style={styles.modalButton}
            >
              <Ionicons name="create-outline" size={20} color="#000" />
              <Text style={styles.modalButtonText}>Edit Note</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAction("hide")}
              style={styles.modalButton}
            >
              <Ionicons name="lock-closed-outline" size={20} />
              <Text style={[styles.modalButtonText]}>Hide Note</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAction("favorite")}
              style={styles.modalButton}
            >
              <Ionicons
                name={selectedNote?.favorite ? "heart" : "heart-outline"}
                size={20}
                color={selectedNote?.favorite ? "red" : "#000"}
              />
              <Text style={[styles.modalButtonText]}>
                {selectedNote?.favorite
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAction("delete")}
              style={styles.modalButton}
            >
              <Ionicons name="trash-outline" size={20} color="red" />
              <Text style={[styles.modalButtonText, { color: "red" }]}>
                Delete Note
              </Text>
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

      {/* ✅ Success Modal (Delete) */}
      <Modal transparent={true} visible={successModalVisible} animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successBox}>
            <Text style={styles.successText}>✅ Note deleted successfully!</Text>
          </View>
        </View>
      </Modal>

      {/* ✅ Favorite Modal */}
      <Modal transparent={true} visible={favoriteModalVisible} animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successBox}>
            <Text
              style={[
                styles.successText,
                { color: favoriteMessage.includes("Removed") ? "red" : "green" },
              ]}
            >
              {favoriteMessage}
            </Text>
          </View>
        </View>
      </Modal>

      {/* ✅ Hide Modal */}
      <Modal transparent={true} visible={hideModalVisible} animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successBox}>
            <Text style={styles.successText}>🙈 Note hidden successfully!</Text>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    margin: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    paddingVertical: 10,
    textAlign: 'center'
  },
  lockButton: {
    backgroundColor: "#4B7BEC",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginVertical: 8,
    width: "95%",
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  successBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    width: "80%",
  },
  successText: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
    textAlign: "center",
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
