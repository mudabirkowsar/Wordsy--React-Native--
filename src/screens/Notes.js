import { View, Text, StyleSheet, FlatList, Pressable, Alert, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Vibration } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DUMMY_HAPTIC_DURATION = 30;

const handleLongPress = () => {
  Vibration.vibrate(DUMMY_HAPTIC_DURATION);
  Alert.alert("Long press detected");
};

const dummyNotes = [
  { id: "1", title: "Shopping List", description: "Milk, Bread, Eggs, Butter, Fruits, Cheese, Coffee, Tea, Rice, Pasta, Tomatoes, Onions, Garlic" },
  { id: "2", title: "Work Tasks", description: "Finish UI design for the mobile app, prepare weekly status report, attend team meeting, review pull requests, and plan sprint backlog." },
  { id: "3", title: "Ideas", description: "App for tracking daily habits with AI integration. It should analyze patterns, suggest improvements, and motivate users with streak rewards." },
  { id: "4", title: "Travel Plan", description: "Visit Goa in December, explore beaches, try seafood, attend night markets, and plan scuba diving adventure with friends." },
  { id: "5", title: "Books to Read", description: "Atomic Habits by James Clear, Deep Work by Cal Newport, The Alchemist by Paulo Coelho, The Subtle Art of Not Giving a F*ck by Mark Manson." },
  { id: "6", title: "Personal Goals", description: "Exercise 5 days a week, read at least 20 pages daily, reduce screen time, improve diet, and start journaling every night before sleep." },
  { id: "7", title: "Quotes", description: "Stay hungry, stay foolish. – Steve Jobs. \nSuccess is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill" },
  { id: "8", title: "Birthday Plans", description: "Organize a surprise party, order chocolate cake, decorate the hall with balloons and lights, arrange music playlist, and invite close friends." },
  { id: "9", title: "Learning Goals", description: "Master React Native, dive deeper into Redux Toolkit, learn backend with Node.js & Express, and understand MongoDB aggregation queries." },
  { id: "10", title: "Fitness Routine", description: "Morning jog for 20 minutes, strength training thrice a week, yoga on weekends, drink 3 liters of water daily, and track calories properly." },
  { id: "11", title: "Movie Watchlist", description: "Inception, Interstellar, The Dark Knight, Fight Club, The Shawshank Redemption, Parasite, Oppenheimer, Spirited Away." },
  { id: "12", title: "Recipe Notes", description: "Pasta Aglio e Olio: boil pasta, sauté garlic in olive oil, add chili flakes, toss pasta, garnish with parsley and parmesan cheese." },
  { id: "13", title: "Meeting Notes", description: "Discussed next sprint goals, emphasized on code quality, set deadlines for backend API completion, and planned user testing session." },
  { id: "14", title: "Finance Goals", description: "Save 30% of monthly salary, invest in index funds, build emergency fund of 6 months, reduce unnecessary expenses, and track with budgeting app." },
  { id: "15", title: "Gardening Tasks", description: "Water plants daily, trim the bushes, plant new flowers, fertilize soil weekly, and check for pests." },
  { id: "16", title: "Shopping Wishlist", description: "New headphones, sneakers, smartwatch, backpack, sunglasses, books, and winter jackets." },
  { id: "17", title: "Project Ideas", description: "Build a smart home app, create a budget tracker, develop a travel planner, and design a recipe sharing platform." },
  { id: "18", title: "Event Planning", description: "Organize charity event, book venue, arrange catering, send invitations, and plan event activities." },
  { id: "19", title: "Health Checkups", description: "Schedule dentist appointment, annual physical checkup, eye exam, and blood tests." },
  { id: "20", title: "Bucket List", description: "Skydiving, visit Japan, learn a new language, climb a mountain, and attend a music festival." },
  { id: "21", title: "Daily Journal", description: "Reflect on day, write down achievements, note areas to improve, set tomorrow's goals, and gratitude list." },
  { id: "22", title: "Shopping Recipes", description: "Buy ingredients for lasagna, chicken curry, vegetable stir fry, homemade pizza, and chocolate cake." },
  { id: "23", title: "Workouts", description: "Monday: Cardio, Tuesday: Strength, Wednesday: Yoga, Thursday: HIIT, Friday: Swimming, Saturday: Rest, Sunday: Walk." },
];

export default function Notes() {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes List</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      <FlatList
        data={dummyNotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        renderItem={({ item, index }) => (
          <Pressable onLongPress={handleLongPress}>
            <View
              style={[
                styles.card,
                { backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d9f0ff" },
              ]}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text
                style={styles.description}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>
            </View>
          </Pressable>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <MaterialCommunityIcons name="note-plus-outline" color="white" size={24} />
      </TouchableOpacity>
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
    bottom: 30, // distance from bottom
    right: 20,  // distance from right
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: "#1e90ff",
    backgroundColor:"black",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
});
