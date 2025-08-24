import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Vibration,
    FlatList,
    Alert,
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
    const [lockedNotes, setLockedNotes] = useState(dummyTodos);

    // add two new states
    const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] = useState(false);
    const [unhideSuccessModalVisible, setUnhideSuccessModalVisible] = useState(false);


    const [selectedNote, setSelectedNote] = useState(null);
    const [pin, setPin] = useState("");
    const MAX_LENGTH = 5;

    const isFocused = useIsFocused()

    const dummyTodos = [
        {
            id: "1",
            title: "Shopping List",
            description: "This shopping list is a detailed reminder of everything I need to purchase for the upcoming week. I must buy milk, eggs, bread, butter, and cheese for daily breakfasts. Additionally, I need fresh fruits like apples, bananas, and oranges. Vegetables such as spinach, carrots, tomatoes, onions, and potatoes are necessary for lunches and dinners. Snacks like biscuits, chocolates, and chips should also be included for small breaks. Don’t forget cereals, oats, coffee, and tea for morning routines. I also need cleaning supplies such as dish soap, detergent, and hand sanitizer. Planning for any forgotten essentials, I will also check if rice, lentils, and cooking oil are sufficient. This organized approach will ensure I don’t forget anything and help maintain a smooth household routine for the week.",
            author: "Mudabir",
            pinned: false,
            date: "2025-08-21"
        },
        {
            id: "2",
            title: "Work Tasks",
            description: "Today’s work tasks require careful planning and focused execution. I need to finish designing the user interface for the new mobile app, ensuring it is minimal, user-friendly, and aligns with the brand’s visual guidelines. After completing the UI, I will prepare the monthly performance report detailing project progress, resource allocation, and team productivity metrics. Scheduling a team meeting is also important to discuss upcoming deliverables and address blockers. Reviewing pull requests submitted by team members will help maintain code quality. Additionally, I need to draft an email summarizing the week’s progress to the client. If time allows, I plan to research automation tools to enhance workflow efficiency and productivity, aiming to meet deadlines effectively.",
            author: "Khanday",
            pinned: false,
            date: "2025-08-20"
        },
        {
            id: "3",
            title: "Ideas for App",
            description: "I am brainstorming ideas for a new mobile app focused on productivity and habit tracking. Users will log daily habits, track progress, and receive personalized suggestions from an AI assistant. The app could integrate wearable devices to monitor steps, heart rate, and sleep patterns. Gamification features such as streaks, rewards, and achievements will motivate users to maintain consistency. Social sharing options will allow users to share progress with friends or groups for accountability. Additionally, the app will provide weekly summaries, insights, and reminders to ensure tasks and habits are maintained. Over time, AI could analyze user patterns and suggest optimized routines. This combination of habit tracking, AI recommendations, and gamification could help users improve productivity and wellness in a structured, engaging manner.",
            author: "Mudabir",
            pinned: false,
            date: "2025-08-19"
        },
        {
            id: "4",
            title: "Travel Plan",
            description: "I am planning a detailed travel itinerary for a trip to Europe in December. The plan includes visiting France, Italy, and Spain. In France, I want to explore Paris, seeing the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. In Italy, Rome, Florence, and Venice are key destinations, each offering unique cultural, historical, and culinary experiences. Spain will include Barcelona, Madrid, and Seville, with a focus on architecture, tapas, and flamenco shows. Accommodation will be booked near city centers to save commuting time. I will also plan local transportation, museum tickets, and guided tours in advance. Documenting each day with photos and notes is essential to preserve memories and create a travel blog. Overall, this itinerary ensures a balance of sightseeing, relaxation, and cultural immersion.",
            author: "Khanday",
            pinned: false,
            date: "2025-08-18"
        },
        {
            id: "5",
            title: "Book Summary",
            description: "I recently read a book about personal growth and discipline, which emphasizes creating daily routines to achieve long-term goals. The book explains that motivation is temporary, while consistent actions yield real results over time. Through multiple case studies, the author illustrates how successful individuals structure their day to maximize productivity. Key strategies include time blocking, prioritizing high-impact tasks, tracking progress, and reflecting on accomplishments. The book also highlights the importance of resilience and adapting to failures as opportunities to learn. Exercises and challenges at the end of each chapter encourage readers to implement these principles immediately. By following these guidelines, one can cultivate self-discipline, increase focus, and achieve meaningful personal and professional growth over time.",
            author: "Mudabir",
            pinned: false,
            date: "2025-08-17"
        },
        {
            id: "6",
            title: "Fitness Goals",
            description: "Over the next three months, I plan to improve my overall fitness, focusing on strength, endurance, and flexibility. My workout routine will include cardio exercises like running, cycling, and swimming three to four times a week. Strength training will focus on major muscle groups, including chest, back, legs, and core. Flexibility sessions through yoga and stretching exercises will be conducted twice weekly. Nutrition is a key component, ensuring adequate protein intake, balanced carbohydrates, healthy fats, and proper hydration. I will track progress with a fitness app, monitoring weight, body fat percentage, and workout performance. This holistic plan will help achieve weight management goals, increase stamina, and maintain a healthy lifestyle sustainably.",
            author: "Khanday",
            pinned: false,
            date: "2025-08-16"
        },
        {
            id: "7",
            title: "Learning React Native",
            description: "I am dedicating the next month to mastering React Native. The learning plan starts with understanding React fundamentals including components, state, and props. I will then focus on React Native-specific features such as styling, navigation, FlatList, and handling gestures. Managing asynchronous operations with async/await and integrating APIs is also a priority. Redux will be used for state management across larger projects. Building small projects like a notes app, todo app, and weather app will provide hands-on experience. I also plan to explore animations, testing, performance optimization, and deployment to both iOS and Android. This structured approach ensures continuous learning, real-world practice, and a deep understanding of mobile development.",
            author: "Mudabir",
            pinned: false,
            date: "2025-08-15"
        },
        {
            id: "8",
            title: "Daily Journal",
            description: "Today was a productive and reflective day. I started the morning with meditation and a 5-kilometer jog, which energized me for the day. I then focused on completing pending tasks at work, ensuring deadlines were met efficiently. During lunch, I spent time reading an insightful chapter of a book on personal development. The afternoon included a team brainstorming session to improve workflow and collaboration. In the evening, I connected with friends virtually, sharing updates and experiences. Writing down reflections and planning tomorrow’s tasks provided clarity and motivation. This journaling habit helps maintain mental wellness, track achievements, and set intentions for the upcoming days.",
            author: "Khanday",
            pinned: false,
            date: "2025-08-14"
        }
    ];


    const fetchLockedNotes = useCallback(async () => {
        try {
            const data = await getHiddenNotes();
            setLockedNotes(data);
        } catch (error) {
            console.log("Error ", error)
        }
    }, [])

    useEffect(() => {
        if (isFocused) {
            fetchLockedNotes()
        }
    }, [])

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

    // Delete note
    const deleteLockedNote = async (id) => {
        await deleteHiddenNote(id).then(() => {
            fetchLockedNotes();
            setDetailModalVisible(false);
            setDeleteSuccessModalVisible(true); // show delete success modal
        });
    };

    // Unhide note (move it back to normal notes)
    const unhideLockedNote = async (id) => {
        await unhideNote(id).then(() => {
            fetchLockedNotes();
            setDetailModalVisible(false);
            setUnhideSuccessModalVisible(true); // show unhide success modal
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

            {/* Footer with Author + Date */}
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

                        {/* Buttons */}
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

            {/* Delete Success Modal */}
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
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    todoHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    todoTitle: { fontSize: 17, fontWeight: "700", color: "#222" },
    todoDesc: { fontSize: 14, color: "#555", marginBottom: 8 },
    todoFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 6,
    },
    todoMeta: { fontSize: 12, color: "#777", fontStyle: 'italic' },

    // Detail Modal
    detailOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
    },
    detailContainer: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 20,
        width: "90%",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    detailHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
    },
    detailDesc: {
        fontSize: 15,
        color: "#555",
        marginBottom: 15,
        lineHeight: 22,
    },
    detailFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 8,
        marginBottom: 15,
    },
    detailMeta: { fontSize: 13, color: "#777" },
    btnRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    // Menu
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

    // Success Modal
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
