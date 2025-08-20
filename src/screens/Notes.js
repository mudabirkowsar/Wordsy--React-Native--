import {
  View, Text, StyleSheet, FlatList, Pressable, Alert, TouchableOpacity, Modal
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Vibration } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";

const DUMMY_HAPTIC_DURATION = 20;
const dummyNotes = [
  {
    id: "1",
    title: "Shopping List",
    description: "This shopping list is a comprehensive reminder of everything I need to purchase this week. I must buy milk, bread, eggs, butter, and fresh fruits like apples, bananas, and oranges for daily consumption. Additionally, I need to pick up some vegetables such as spinach, carrots, potatoes, onions, and tomatoes to prepare meals for the next few days. Snacks like biscuits, chips, and chocolates should also be on the list for evening tea and family time. I want to ensure I get cereals, oats, and coffee as well for my morning routine. Don’t forget spices like turmeric, cumin, coriander powder, and garam masala to keep cooking flavorful. I also need to check if we are low on cooking oil, rice, and lentils. Finally, I will purchase cleaning supplies like dish soap, detergent, and sanitizer. This list should cover all essentials, and I’ll update it if I remember more items before heading to the store.",
    pinned: false,
    date: "2025-08-21",
  },
  {
    id: "2",
    title: "Work Tasks",
    description: "Today’s work tasks are critical and need to be completed with focus and discipline. First, I must finish the user interface design for the new mobile app we are developing. The design should be minimal, user-friendly, and aligned with our brand’s visual guidelines. After that, I need to prepare the monthly performance report, including details about project progress, resource allocation, and productivity metrics. This report will be shared with management, so it must be accurate and clearly formatted. I also have to schedule a team meeting to discuss upcoming deliverables and deadlines. During the meeting, I will address any blockers, assign responsibilities, and encourage collaboration. In addition, I must review pull requests submitted by team members to ensure code quality and maintain project standards. Lastly, I plan to write an email to our client summarizing the week’s progress and the next milestones. If time permits, I will also explore automation tools to improve our workflow and productivity, ensuring we stay ahead of deadlines and deliver top-quality work.",
    pinned: false,
    date: "2025-08-20",
  },
  {
    id: "3",
    title: "Ideas",
    description: "One of the most exciting ideas I’ve been considering lately is creating an app for tracking daily habits with AI integration. The app could help users build consistency in areas such as fitness, learning, meditation, or even managing finances. Users would log their habits, and the app would use AI to provide personalized suggestions, encouragement, and feedback. For example, if a user sets a goal to exercise regularly, the AI could analyze their patterns and recommend optimal times for workouts. The app could integrate with wearable devices to track progress in real time and provide alerts or reminders when needed. Another potential feature is gamification—rewards, badges, and progress streaks to keep users motivated. Social features could allow people to share milestones with friends and form accountability groups. Over time, the app could use machine learning to adapt to user behavior and refine recommendations. If developed properly, this idea has the potential to improve productivity, health, and lifestyle for thousands of users worldwide, making daily habits easier to track and sustain over time.",
    pinned: false,
    date: "2025-08-19",
  },
  {
    id: "4",
    title: "Travel Plan",
    description: "I am planning a trip to Goa in December, and I want it to be memorable and relaxing. My primary goal is to explore the beautiful beaches, such as Baga, Calangute, Anjuna, and Palolem, each offering a unique experience with scenic views, soft sand, and relaxing waves. Apart from beaches, I want to visit Aguada Fort, Chapora Fort, and Basilica of Bom Jesus to explore the history and culture of the region. Nightlife is another highlight, and I plan to check out famous clubs, beach parties, and live music events. Food is also a priority, so I will try authentic Goan seafood, especially prawn curry, fish thali, and bebinca for dessert. Adventure activities like parasailing, scuba diving, and jet skiing are on my list as well. I also plan to book a comfortable stay near the beach so I can enjoy sunrise and sunset views every day. Overall, this travel plan is intended to provide a balanced combination of relaxation, adventure, and cultural exploration. I will document each day, take photos, and make sure the trip is enriching and memorable for everyone joining.",
    pinned: false,
    date: "2025-08-18",
  },
  {
    id: "5",
    title: "Book Summary",
    description: "Recently, I finished reading an inspiring book that emphasizes the importance of discipline and consistent effort in achieving success. The author shares personal stories, real-world examples, and practical exercises to highlight how small, repeated actions compound over time to bring meaningful results. One of the key lessons I learned is that motivation is fleeting, but discipline sustains progress. Instead of waiting for the perfect moment, the book advises creating routines and sticking to them, even when it feels difficult. Another takeaway is the significance of focus—learning to say no to distractions and prioritizing what truly matters. The book also discusses resilience, urging readers to embrace failure as a stepping stone to growth rather than a setback. I found the writing style engaging and filled with actionable advice rather than just theories. I plan to implement strategies such as creating a structured daily schedule, tracking habits, and reviewing progress weekly. Overall, the book is a practical guide to achieving long-term success, self-improvement, and personal growth.",
    pinned: false,
    date: "2025-08-17",
  },
  {
    id: "6",
    title: "Fitness Goals",
    description: "My fitness goals for the next three months are designed to improve both strength and endurance while maintaining a balanced lifestyle. I plan to follow a structured workout plan that includes cardio, strength training, and flexibility exercises. My cardio routine will include jogging three times a week and cycling on weekends. Strength training will alternate between upper body, lower body, and core workouts at least four times a week. Flexibility will be improved through yoga sessions twice weekly to prevent injury and enhance mobility. Nutrition will play a crucial role, so I aim to maintain a balanced diet rich in protein, complex carbohydrates, healthy fats, and fiber. I will avoid processed foods, reduce sugar intake, and stay hydrated. To track my progress, I’ll use a fitness app and wearable devices to monitor calories burned, heart rate, and sleep quality. My ultimate goal is to lose fat, gain muscle, and develop sustainable healthy habits that I can maintain throughout the year.",
    pinned: false,
    date: "2025-08-16",
  },
  {
    id: "7",
    title: "Learning React Native",
    description: "I have set a goal to learn React Native thoroughly over the next few weeks. My learning plan begins with understanding the fundamentals of React, including components, props, state, and lifecycle methods. After mastering the basics, I will move on to React Native-specific concepts such as View, Text, ScrollView, FlatList, and Modal. I also want to understand navigation deeply using React Navigation, including stack, tab, and drawer navigators. Handling API calls, managing asynchronous code with async/await, and integrating Redux for state management are also included in my plan. To make my learning practical, I’ll build small projects like a to-do app, notes app, and weather app. Later, I will explore advanced topics like animations, performance optimization, testing, and deployment to both iOS and Android platforms. My ultimate goal is to gain enough confidence to develop, publish, and maintain fully functional mobile apps, while learning best practices in React Native development and state management. This structured approach ensures continuous learning and hands-on experience throughout the process.",
    pinned: false,
    date: "2025-08-15",
  },
  {
    id: "8",
    title: "Daily Journal",
    description: "Today has been quite eventful, and I want to document everything that happened. I started my day with a refreshing morning jog, which instantly boosted my energy levels. After breakfast, I focused on completing pending work tasks, which gave me a sense of accomplishment. Later in the afternoon, I dedicated time to reading a book that I’ve been meaning to finish for weeks. The story was engaging and kept me hooked for hours, providing both inspiration and learning. In the evening, I caught up with an old friend over a phone call, and we shared many memories and laughter. Before dinner, I practiced meditation for 20 minutes, helping me calm my mind and reflect on the day. Overall, journaling today reminds me to cherish simple moments, maintain balance between work, learning, and personal relationships, and plan for a productive tomorrow. Writing down my experiences also helps me track progress and maintain gratitude for everyday life.",
    pinned: false,
    date: "2025-08-14",
  },
  {
    id: "9",
    title: "Project Ideas",
    description: "I want to brainstorm some project ideas that could potentially be developed into real applications. One idea is a personal finance manager app that helps users track expenses, set savings goals, and receive AI-driven advice. Another idea is a smart recipe app that suggests meals based on ingredients available at home, reducing food waste and saving money. A third idea could be a productivity tool with integrated task management, note-taking, and calendar syncing, allowing users to organize their lives efficiently. I am also considering a language learning app that uses gamification and AI to personalize lessons. For developers, an open-source boilerplate project that simplifies setting up full-stack applications could be highly valuable. To select the best idea, I will evaluate factors like feasibility, demand, scalability, and personal interest. Once finalized, I plan to create a roadmap, identify required tools, and start building a minimum viable product, ensuring proper planning, execution, and testing at every stage.",
    pinned: false,
    date: "2025-08-13",
  },
]




export default function Notes() {
  const [notes, setNotes] = useState(dummyNotes);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation()

  const handleLongPress = (note) => {
    Vibration.vibrate(DUMMY_HAPTIC_DURATION);
    setSelectedNote(note);
    setModalVisible(true);
  };

  const handleAction = (action) => {
    setModalVisible(false);
    if (action === "pin") {
      setNotes((prevNotes) => {
        // Toggle pin
        const updatedNotes = prevNotes.map((n) =>
          n.id === selectedNote.id ? { ...n, pinned: !n.pinned } : n
        );

        // Sort so pinned notes always come first
        updatedNotes.sort((a, b) => {
          if (a.pinned === b.pinned) return 0;
          return a.pinned ? -1 : 1;
        });

        return updatedNotes;
      });
    } else if (action === "edit") {
      navigation.navigate("EditNote", { note: selectedNote });
      // Alert.alert("Edit", `Editing ${selectedNote.title}`);
    } else if (action === "delete") {
      Alert.alert("Deleted", `${selectedNote.title} deleted!`);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes List</Text>
        <TouchableOpacity>
          <Ionicons name="lock-closed-outline" size={20} color="#000" />
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

              {/* Date */}
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
          </Pressable>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
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
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  container: {
    paddingVertical: 10,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
  date: {
  fontSize: 12,
  color: "#888",
  marginTop: 10,
  textAlign: "right",
  fontStyle: "italic",
},
});
