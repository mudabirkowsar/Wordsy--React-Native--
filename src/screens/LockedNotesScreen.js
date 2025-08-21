import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LockedNotesScreen({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);

    // Dummy locked notes data
    const lockedNotes = [
        { id: "1", title: "Personal Journal", description: "My private thoughts..." },
        { id: "2", title: "Work Secrets", description: "Confidential project notes" },
        { id: "3", title: "Travel Plans", description: "Hidden travel itinerary" },
    ];

    const renderNote = ({ item }) => (
        <TouchableOpacity style={styles.noteCard}>
            <View style={styles.noteHeader}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Ionicons name="lock-closed" size={18} color="#555" />
            </View>
            <Text style={styles.noteDesc}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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

            {/* Info Text */}
            <View style={styles.infoContainer}>
                <Ionicons name="lock-closed" size={22} color="#333" />
                <Text style={styles.infoText}>Your locked notes are protected</Text>
            </View>

            {/* Notes List */}
            {lockedNotes.length > 0 ? (
                <FlatList
                    data={lockedNotes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNote}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="lock-closed-outline" size={40} color="#888" />
                    <Text style={styles.emptyText}>No locked notes yet</Text>
                </View>
            )}

            {/* Menu Modal */}
            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setMenuVisible(false)}
                    activeOpacity={1}
                >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuText}>Change Lock Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuText}>Unlock All Notes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuText}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f9f9f9",
    },
    infoText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#555",
    },
    list: {
        padding: 15,
    },
    noteCard: {
        backgroundColor: "#f2f2f2",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
    },
    noteHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    noteDesc: {
        fontSize: 14,
        color: "#555",
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        marginTop: 8,
        fontSize: 16,
        color: "#888",
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
});
