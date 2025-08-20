// HomeScreen.js
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Notes from "./Notes";
import Todos from "./Todos";
import FavoriteNotes from "./FavoriteNotes";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Notes");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["Notes", "To-do", "Favorite Notes"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Wordsy</Text>
        <TouchableOpacity onPress={() => setIsSearchFocused(!isSearchFocused)}>
          <AntDesign name="search1" color="#000" size={26} />
        </TouchableOpacity>
      </View>

      {/* Search bar overlay (absolute positioned) */}
      {isSearchFocused && (
        <View style={styles.searchOverlay}>
          <View style={styles.searchContainer}>
            <AntDesign name="search1" size={20} color="gray" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search notes..."
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            <TouchableOpacity onPress={() => setIsSearchFocused(false)}>
              <AntDesign name="closecircle" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Navigation Tabs */}
      <View style={styles.navContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content */}
      <ScrollView style={{ marginTop: 10 }}>
        {activeTab === "Notes" && <Notes />}
        {activeTab === "To-do" && <Todos />}
        {activeTab === "Favorite Notes" && <FavoriteNotes />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    flex: 1,
  },

  // Header
  header: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },

  // Absolute search overlay
  searchOverlay: {
    position: "absolute",
    top: 50, // just below the header
    left: 20,
    right: 20,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

  // Navigation tabs
  navContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 15,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#000",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
  },
});
