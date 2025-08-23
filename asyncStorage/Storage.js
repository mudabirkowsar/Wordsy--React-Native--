import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "NOTES"; // storage key

// 📌 Add a note
export const addNote = async (note) => {
  try {
    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    const notes = existingNotes ? JSON.parse(existingNotes) : [];
    notes.push(note);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

// 📌 Get all notes
export const getNotes = async () => {
  try {
    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    return existingNotes ? JSON.parse(existingNotes) : [];
  } catch (error) {
    console.error("Error getting notes:", error);
    return [];
  }
};

// 📌 Update a note (by id)
export const updateNote = async (id, updatedNote) => {
  try {
    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    let notes = existingNotes ? JSON.parse(existingNotes) : [];
    notes = notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note));
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

// 📌 Toggle favorite status of a note (by id)
export const toggleFavoriteNote = async (id) => {
  try {
    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    let notes = existingNotes ? JSON.parse(existingNotes) : [];

    // find the note by id
    notes = notes.map((note) =>
      note.id === id ? { ...note, favorite: !note.favorite } : note
    );

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error toggling favorite note:", error);
  }
};


// 📌 Delete a note (by id)
export const deleteNote = async (id) => {
  try {
    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    let notes = existingNotes ? JSON.parse(existingNotes) : [];
    notes = notes.filter((note) => note.id !== id);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

// 📌 Clear all notes
export const clearNotes = async () => {
  try {
    await AsyncStorage.removeItem(NOTES_KEY);
  } catch (error) {
    console.error("Error clearing notes:", error);
  }
};
