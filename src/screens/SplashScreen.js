// SplashScreen.js
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset navigation stack so SplashScreen is removed
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.book}>📓</Text>
        <Text style={styles.title}>WORDSY</Text>
        <Text style={styles.subtitle}>
          Easily Manage Your Notes On Your Phone {"\n"}& You Can Have Infinite Notes
        </Text>
      </View>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading..</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  book: {
    fontSize: 32,
    color: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#ccc",
    lineHeight: 20,
  },
  loader: {
    alignItems: "center",
    marginBottom: 40,
  },
  loadingText: {
    marginTop: 6,
    color: "#ccc",
    fontSize: 12,
  },
});
