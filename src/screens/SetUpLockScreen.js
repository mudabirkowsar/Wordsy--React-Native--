import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Vibration,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SetUpLockScreen({ navigation }) {
    const [pin, setPin] = useState("");
    const MAX_LENGTH = 5;

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
            alert("PIN set successfully: " + pin);
            AsyncStorage.setItem("lockPassword", pin);
            navigation.replace('LockedNotes')
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
                <Text style={styles.title}>Set your PIN</Text>
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
        marginTop: 40, // Space from top
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
});
