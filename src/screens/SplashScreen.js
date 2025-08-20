// SplashScreen.js
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  const pages = Array.from({ length: 4 }, () => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    // Background color animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Logo animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Sequential page flip animation
    pages.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200), // stagger pages
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // Navigate after 3.5s
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#4facfe", "#00f2fe"],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      {/* Logo */}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: fadeAnim,
          alignItems: "center",
        }}
      >
        <Text style={styles.book}>📓</Text>
        <Text style={styles.title}>WORDSY</Text>
        <Text style={styles.subtitle}>
          Easily manage your notes{"\n"}and flip through infinite ideas
        </Text>
      </Animated.View>

      {/* Notebook loader */}
      <View style={styles.notebookContainer}>
        {pages.map((anim, index) => {
          const rotateX = anim.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"],
          });
          const opacity = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.3],
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.page,
                { transform: [{ rotateX }], opacity, zIndex: pages.length - index },
              ]}
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  book: {
    fontSize: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0f7ff",
    textAlign: "center",
    lineHeight: 24,
  },
  notebookContainer: {
    marginTop: 80,
    width: 60,
    height: 60,
    justifyContent: "space-between",
  },
  page: {
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 2,
    marginVertical: 3,
  },
});
