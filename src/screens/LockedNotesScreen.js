import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Vibration,
    FlatList,
    ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { deleteHiddenNote, getHiddenNotes, unhideNote } from "../../asyncStorage/Storage";

export default function LockedNotesScreen({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [lockedNotes, setLockedNotes] = useState([]);

    const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] = useState(false);
    const [unhideSuccessModalVisible, setUnhideSuccessModalVisible] = useState(false);

    const [selectedNote, setSelectedNote] = useState(null);
    const [pin, setPin] = useState("");
    const MAX_LENGTH = 5;

    const isFocused = useIsFocused();

    const fetchLockedNotes = useCallback(async () => {
        try {
            const data = await getHiddenNotes();
            setLockedNotes(data);
        } catch (error) {
            console.log("Error ", error);
        }
    }, []);

    useEffect(() => {
        if (isFocused) fetchLockedNotes();
    }, [isFocused]);

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
            setSuccessModalVisible(true);
        }
    };

    const deleteLockedNote = async (id) => {
        await deleteHiddenNote(id).then(() => {
            fetchLockedNotes();
            setDetailModalVisible(false);
            setDeleteSuccessModalVisible(true);
        });
    };

    const unhideLockedNote = async (id) => {
        await unhideNote(id).then(() => {
            fetchLockedNotes();
            setDetailModalVisible(false);
            setUnhideSuccessModalVisible(true);
        });
    };

    const renderTodo = ({ item }) => (
        <TouchableOpacity
            style={styles.todoCard}
            onPress={() => {
                setSelectedNote(item);
                setDetailModalVisible(true);
            }}
        >
            <View style={styles.todoHeader}>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Ionicons name="lock-closed" size={18} color="#555" />
            </View>
            <Text style={styles.todoDesc} numberOfLines={2}>
                {item.description}
            </Text>
            <View style={styles.todoFooter}>
                <Text style={styles.todoMeta}>{item.author}</Text>
                <Text style={styles.todoMeta}>{item.currentDate}</Text>
            </View>
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
                data={lockedNotes}
                keyExtractor={(item) => item.id}
                renderItem={renderTodo}
                contentContainerStyle={{ padding: 15 }}
            />

            {/* Detail Modal */}
            <Modal visible={detailModalVisible} transparent animationType="fade">
                <View style={styles.detailOverlay}>
                    <View style={styles.detailContainer}>
                        {/* Scrollable content */}
                        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={{ flex: 1 }}>
                            <View style={styles.detailHeader}>
                                <Text style={styles.detailTitle}>{selectedNote?.title}</Text>
                                <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                                    <Ionicons name="close" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.detailDesc}>{selectedNote?.description}</Text>

                            <View style={styles.detailFooter}>
                                <Text style={styles.detailMeta}>✍️ {selectedNote?.author}</Text>
                                <Text style={styles.detailMeta}>📅 {selectedNote?.currentDate}</Text>
                            </View>
                        </ScrollView>

                        {/* Buttons fixed at bottom */}
                        <View style={styles.btnRow}>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: "#e63946" }]}
                                onPress={() => deleteLockedNote(selectedNote?.id)}
                            >
                                <Text style={styles.btnText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: "#4BB543" }]}
                                onPress={() => unhideLockedNote(selectedNote?.id)}
                            >
                                <Text style={styles.btnText}>Unhide</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={deleteSuccessModalVisible} transparent animationType="fade">
                <View style={styles.successOverlay}>
                    <View style={styles.successContainer}>
                        <Ionicons name="checkmark-circle" size={60} color="#e63946" />
                        <Text style={styles.successText}>Note deleted successfully!</Text>
                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => setDeleteSuccessModalVisible(false)}
                        >
                            <Text style={styles.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Unhide Success Modal */}
            <Modal visible={unhideSuccessModalVisible} transparent animationType="fade">
                <View style={styles.successOverlay}>
                    <View style={styles.successContainer}>
                        <Ionicons name="checkmark-circle" size={60} color="#4BB543" />
                        <Text style={styles.successText}>Note unhidden successfully!</Text>
                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => setUnhideSuccessModalVisible(false)}
                        >
                            <Text style={styles.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
    headerTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
    todoCard: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    todoHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    todoTitle: { fontSize: 17, fontWeight: "700", color: "#222" },
    todoDesc: { fontSize: 14, color: "#555", marginBottom: 8 },
    todoFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 6,
    },
    todoMeta: { fontSize: 12, color: "#777", fontStyle: "italic" },

    detailOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 10,
    },
    detailContainer: {
        backgroundColor: "#fff",
        borderRadius: 14,
        width: "90%",
        maxHeight: "80%",
        // height: "auto",
        flex: 1,          // <-- allow ScrollView to take remaining space
        padding: 15,
    },

    detailHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    detailTitle: { fontSize: 20, fontWeight: "700", color: "#222" },
    detailDesc: { fontSize: 15, color: "#555", lineHeight: 22, marginBottom: 10 },
    detailFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 8,
        marginBottom: 10,
    },
    detailMeta: { fontSize: 13, color: "#777" },
    btnRow: { flexDirection: "row", justifyContent: "space-between" },
    actionBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: "center", marginHorizontal: 5 },
    btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
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

    // PIN Modal
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


});
