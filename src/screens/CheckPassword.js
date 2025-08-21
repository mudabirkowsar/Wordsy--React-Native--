import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CheckPassword({ navigation }) {
  const [pin, setPin] = useState("");
  const [lockPassword, setLockPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const MAX_LENGTH = 5;

  useEffect(() => {
    AsyncStorage.getItem("lockPassword").then((password) => {
      if (password) {
        setLockPassword(password);
      }
    });
  }, []);

  const handlePress = (num) => {
    if (pin.length < MAX_LENGTH) {
      setPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    if (pin.length === MAX_LENGTH) {
      Vibration.vibrate(30);
      if (lockPassword === pin) {
        navigation.replace("LockedNotes");
      } else {
        setShowModal(true); // Show incorrect password modal
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Enter Your PIN</Text>
        <View style={styles.dotsContainer}>
          {[...Array(MAX_LENGTH)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i < pin.length ? "#333" : "#ccc" },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.keypad}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.key}
                onPress={() => {
                  if (item === "⌫") handleDelete();
                  else if (item !== "") handlePress(item);
                }}
              >
                <Text style={styles.keyText}>{item}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.confirmBtn,
            { backgroundColor: pin.length === MAX_LENGTH ? "#333" : "#aaa" },
          ]}
          disabled={pin.length !== MAX_LENGTH}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      {/* Incorrect Password Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="lock-closed-outline" size={40} color="#e63946" />
            <Text style={styles.modalTitle}>Incorrect Password</Text>
            <Text style={styles.modalMsg}>
              The PIN you entered is not correct.
            </Text>

            <TouchableOpacity
              style={styles.tryAgainBtn}
              onPress={() => {
                setPin(""); // reset entered PIN
                setShowModal(false); // close modal
              }}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 10,
  },
  topSection: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    margin: 10,
  },
  bottomSection: {
    marginBottom: 40,
    alignItems: "center",
  },
  keypad: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  key: {
    width: "30%",
    aspectRatio: 1,
    margin: "1.5%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  keyText: {
    fontSize: 26,
    fontWeight: "500",
    color: "#333",
  },
  confirmBtn: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    color: "#e63946",
  },
  modalMsg: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  tryAgainBtn: {
    marginTop: 15,
    backgroundColor: "#333",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
  },
  tryAgainText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
