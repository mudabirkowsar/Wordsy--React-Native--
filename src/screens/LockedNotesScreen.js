import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Vibration,
    FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LockedNotesScreen({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [pin, setPin] = useState("");
    const MAX_LENGTH = 5;

    const [lockedTodos, setLockedTodos] = useState([
        { id: "1", title: "Personal Journal", description: "My private thoughts..." },
        { id: "2", title: "Work Secrets", description: "Confidential project notes" },
        { id: "3", title: "Travel Plans", description: "Hidden travel itinerary" },
        { id: "4", title: "Shopping List", description: "Buy milk, eggs, bread..." },
        { id: "5", title: "Fitness Goals", description: "Workout 3x per week..." },
    ]);

    const handlePress = (num) => {
        if (pin.length < MAX_LENGTH) setPin((prev) => prev + num);
    };

    const handleDelete = () => {
        setPin((prev) => prev.slice(0, -1));
    };

    const handleConfirm = async () => {
        if (pin.length === MAX_LENGTH) {
            Vibration.vibrate(30);
            await AsyncStorage.setItem("lockPassword", pin);
            setPin("");
            setPinModalVisible(false);
            setSuccessModalVisible(true); // Show success modal
        }
    };

    const renderTodo = ({ item }) => (
        <TouchableOpacity style={styles.todoCard}>
            <View style={styles.todoHeader}>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Ionicons name="lock-closed" size={18} color="#555" />
            </View>
            <Text style={styles.todoDesc}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 50 }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Locked Notes</Text>
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Ionicons name="menu" size={26} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Todos List */}
            <FlatList
                data={lockedTodos}
                keyExtractor={(item) => item.id}
                renderItem={renderTodo}
                contentContainerStyle={{ padding: 15 }}
            />

            {/* Menu Modal */}
            <Modal visible={menuVisible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setPinModalVisible(true);
                                setMenuVisible(false);
                            }}
                        >
                            <Text style={styles.menuText}>Change Lock Password</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* PIN Modal */}
            <Modal visible={pinModalVisible} transparent animationType="slide">
                <View style={styles.pinOverlay}>
                    <View style={styles.pinContainer}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setPinModalVisible(false)}>
                                <Ionicons name="arrow-back" size={28} color="#333" />
                            </TouchableOpacity>
                        </View>

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
                </View>
            </Modal>

            {/* Success Modal */}
            <Modal visible={successModalVisible} transparent animationType="fade">
                <View style={styles.successOverlay}>
                    <View style={styles.successContainer}>
                        <Ionicons name="checkmark-circle" size={60} color="#4BB543" />
                        <Text style={styles.successText}>Password updated successfully!</Text>
                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => setSuccessModalVisible(false)}
                        >
                            <Text style={styles.okButtonText}>OK</Text>
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
        alignItems: "center",
        padding: 15,
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    todoCard: {
        backgroundColor: "#f2f2f2",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
    },
    todoHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    todoTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
    todoDesc: { fontSize: 14, color: "#555" },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 70,
        paddingRight: 15,
    },
    menuContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        width: 200,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    menuText: {
        fontSize: 16,
        color: "#333",
    },
    pinOverlay: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        padding: 20,
    },
    pinContainer: {
        flex: 1,
        justifyContent: "space-between",
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
    successOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    successContainer: {
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 12,
        alignItems: "center",
    },
    successText: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 15,
        textAlign: "center",
    },
    okButton: {
        backgroundColor: "#333",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    okButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
