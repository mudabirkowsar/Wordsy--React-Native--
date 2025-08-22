import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Vibration } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DUMMY_HAPTIC_DURATION = 20;
const dummyNotes = [
  {
    id: "1",
    title: "Shopping List",
    description: "This shopping list is a detailed reminder of everything I need to purchase for the upcoming week. I must buy milk, eggs, bread, butter, and cheese for daily breakfasts. Additionally, I need fresh fruits like apples, bananas, and oranges. Vegetables such as spinach, carrots, tomatoes, onions, and potatoes are necessary for lunches and dinners. Snacks like biscuits, chocolates, and chips should also be included for small breaks. Don’t forget cereals, oats, coffee, and tea for morning routines. I also need cleaning supplies such as dish soap, detergent, and hand sanitizer. Planning for any forgotten essentials, I will also check if rice, lentils, and cooking oil are sufficient. This organized approach will ensure I don’t forget anything and help maintain a smooth household routine for the week.",
    author: "Mudabir",
    pinned: false,
    date: "2025-08-21"
  },
  {
    id: "2",
    title: "Work Tasks",
    description: "Today’s work tasks require careful planning and focused execution. I need to finish designing the user interface for the new mobile app, ensuring it is minimal, user-friendly, and aligns with the brand’s visual guidelines. After completing the UI, I will prepare the monthly performance report detailing project progress, resource allocation, and team productivity metrics. Scheduling a team meeting is also important to discuss upcoming deliverables and address blockers. Reviewing pull requests submitted by team members will help maintain code quality. Additionally, I need to draft an email summarizing the week’s progress to the client. If time allows, I plan to research automation tools to enhance workflow efficiency and productivity, aiming to meet deadlines effectively.",
    author: "Khanday",
    pinned: false,
    date: "2025-08-20"
  },
  {
    id: "3",
    title: "Ideas for App",
    description: "I am brainstorming ideas for a new mobile app focused on productivity and habit tracking. Users will log daily habits, track progress, and receive personalized suggestions from an AI assistant. The app could integrate wearable devices to monitor steps, heart rate, and sleep patterns. Gamification features such as streaks, rewards, and achievements will motivate users to maintain consistency. Social sharing options will allow users to share progress with friends or groups for accountability. Additionally, the app will provide weekly summaries, insights, and reminders to ensure tasks and habits are maintained. Over time, AI could analyze user patterns and suggest optimized routines. This combination of habit tracking, AI recommendations, and gamification could help users improve productivity and wellness in a structured, engaging manner.",
    author: "Mudabir",
    pinned: false,
    date: "2025-08-19"
  },
  {
    id: "4",
    title: "Travel Plan",
    description: "I am planning a detailed travel itinerary for a trip to Europe in December. The plan includes visiting France, Italy, and Spain. In France, I want to explore Paris, seeing the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. In Italy, Rome, Florence, and Venice are key destinations, each offering unique cultural, historical, and culinary experiences. Spain will include Barcelona, Madrid, and Seville, with a focus on architecture, tapas, and flamenco shows. Accommodation will be booked near city centers to save commuting time. I will also plan local transportation, museum tickets, and guided tours in advance. Documenting each day with photos and notes is essential to preserve memories and create a travel blog. Overall, this itinerary ensures a balance of sightseeing, relaxation, and cultural immersion.",
    author: "Khanday",
    pinned: false,
    date: "2025-08-18"
  },
  {
    id: "5",
    title: "Book Summary",
    description: "I recently read a book about personal growth and discipline, which emphasizes creating daily routines to achieve long-term goals. The book explains that motivation is temporary, while consistent actions yield real results over time. Through multiple case studies, the author illustrates how successful individuals structure their day to maximize productivity. Key strategies include time blocking, prioritizing high-impact tasks, tracking progress, and reflecting on accomplishments. The book also highlights the importance of resilience and adapting to failures as opportunities to learn. Exercises and challenges at the end of each chapter encourage readers to implement these principles immediately. By following these guidelines, one can cultivate self-discipline, increase focus, and achieve meaningful personal and professional growth over time.",
    author: "Mudabir",
    pinned: false,
    date: "2025-08-17"
  },
  {
    id: "6",
    title: "Fitness Goals",
    description: "Over the next three months, I plan to improve my overall fitness, focusing on strength, endurance, and flexibility. My workout routine will include cardio exercises like running, cycling, and swimming three to four times a week. Strength training will focus on major muscle groups, including chest, back, legs, and core. Flexibility sessions through yoga and stretching exercises will be conducted twice weekly. Nutrition is a key component, ensuring adequate protein intake, balanced carbohydrates, healthy fats, and proper hydration. I will track progress with a fitness app, monitoring weight, body fat percentage, and workout performance. This holistic plan will help achieve weight management goals, increase stamina, and maintain a healthy lifestyle sustainably.",
    author: "Khanday",
    pinned: false,
    date: "2025-08-16"
  },
  {
    id: "7",
    title: "Learning React Native",
    description: "I am dedicating the next month to mastering React Native. The learning plan starts with understanding React fundamentals including components, state, and props. I will then focus on React Native-specific features such as styling, navigation, FlatList, and handling gestures. Managing asynchronous operations with async/await and integrating APIs is also a priority. Redux will be used for state management across larger projects. Building small projects like a notes app, todo app, and weather app will provide hands-on experience. I also plan to explore animations, testing, performance optimization, and deployment to both iOS and Android. This structured approach ensures continuous learning, real-world practice, and a deep understanding of mobile development.",
    author: "Mudabir",
    pinned: false,
    date: "2025-08-15"
  },
  {
    id: "8",
    title: "Daily Journal",
    description: "Today was a productive and reflective day. I started the morning with meditation and a 5-kilometer jog, which energized me for the day. I then focused on completing pending tasks at work, ensuring deadlines were met efficiently. During lunch, I spent time reading an insightful chapter of a book on personal development. The afternoon included a team brainstorming session to improve workflow and collaboration. In the evening, I connected with friends virtually, sharing updates and experiences. Writing down reflections and planning tomorrow’s tasks provided clarity and motivation. This journaling habit helps maintain mental wellness, track achievements, and set intentions for the upcoming days.",
    author: "Khanday",
    pinned: false,
    date: "2025-08-14"
  }
];


export default function Notes() {
  const [notes, setNotes] = useState(dummyNotes);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [lockPassword, setLockPassowrd] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("lockPassword").then(password => {
      if (password) {
        setLockPassowrd(password);
      }
    });
  }, []);

  const handleLockOption = () => {
    Vibration.vibrate(DUMMY_HAPTIC_DURATION);
    if (!lockPassword) {
      navigation.navigate("SetLock");
    } else {
      navigation.navigate("CheckPassword");
    }
  };

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
      Alert.alert("Deleted", `${selectedNote.title} deleted!`);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes List</Text>

        {/* Stylish Lock Button */}
        <TouchableOpacity
          onPress={handleLockOption}
          style={styles.lockButton}
        >
          <Ionicons name="lock-closed-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        renderItem={({ item, index }) => (
          <Pressable
            onLongPress={() => handleLongPress(item)}
            onPress={() => navigation.navigate("EditNote", { note: item })}
          >
            <View
              style={[
                styles.card,
                { backgroundColor: item.pinned ? "#fffacd" : index % 2 === 0 ? "#f0f0f0" : "#d9f0ff" },
              ]}
            >
              <Text style={styles.title}>
                {item.title} {item.pinned ? "📌" : ""}
              </Text>
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
                <Text style={styles.date}>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddNote")}>
        <MaterialCommunityIcons name="note-plus-outline" color="white" size={24} />
      </TouchableOpacity>

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

            <TouchableOpacity onPress={() => handleAction("pin")} style={styles.modalButton}>
              <Ionicons
                name={selectedNote?.pinned ? "remove-circle-outline" : "pin-outline"}
                size={20}
                color="#000"
              />
              <Text style={styles.modalButtonText}>
                {selectedNote?.pinned ? "Unpin Note" : "Pin Note"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleAction("edit")} style={styles.modalButton}>
              <Ionicons name="create-outline" size={20} color="#000" />
              <Text style={styles.modalButtonText}>Edit Note</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleAction("delete")} style={styles.modalButton}>
              <Ionicons name="trash-outline" size={20} color="red" />
              <Text style={[styles.modalButtonText, { color: "red" }]}>Delete Note</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa", // subtle light background
    borderRadius: 12,
    margin: 10,
    elevation: 3, // shadow for android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  lockButton: {
    backgroundColor: "#4B7BEC", // blue color
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  // Optional: make notes cards slightly more modern
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
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
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
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
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
});
