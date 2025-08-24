import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "NOTES"; // storage key
const HIDDEN_NOTES_KEY = "HIDDEN_NOTES_KEY";

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

    notes = notes.map((note) =>
      note.id === id ? { ...note, favorite: !note.favorite } : note
    );

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error toggling favorite note:", error);
  }
};

// Get only favorite notes 
export const getFavoriteNotes = async () => {
  try {
    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    let notes = existingNotes ? JSON.parse(existingNotes) : [];

    // filter only favorite notes
    return notes.filter((note) => note.favorite);
  } catch (error) {
    console.error("Error fetching favorite notes:", error);
    return [];
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


// ✅ Move note to hidden folder
export const hideNote = async (id) => {
  try {
    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    let notes = existingNotes ? JSON.parse(existingNotes) : [];

    const noteToHide = notes.find((note) => note.id === id);

    if (!noteToHide) return;

    notes = notes.filter((note) => note.id !== id);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));

    const existingHidden = await AsyncStorage.getItem(HIDDEN_NOTES_KEY);
    const hiddenNotes = existingHidden ? JSON.parse(existingHidden) : [];
    hiddenNotes.push(noteToHide);

    await AsyncStorage.setItem(HIDDEN_NOTES_KEY, JSON.stringify(hiddenNotes));
  } catch (error) {
    console.error("Error hiding note:", error);
  }
};

// ✅ Get Hidden Notes
export const getHiddenNotes = async () => {
  try {
    const hiddenNotes = await AsyncStorage.getItem(HIDDEN_NOTES_KEY);
    return hiddenNotes ? JSON.parse(hiddenNotes) : [];
  } catch (error) {
    console.error("Error fetching hidden notes:", error);
    return [];
  }
};

// ✅ Delete Hidden note
export const deleteHiddenNote = async (id) => {
  try {
    const existingNotes = await AsyncStorage.getItem(HIDDEN_NOTES_KEY);
    let notes = existingNotes ? JSON.parse(existingNotes) : [];
    notes = notes.filter((note) => note.id !== id);
    await AsyncStorage.setItem(HIDDEN_NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error deleting hidden note:", error);
  }
};

// ✅ Unhide a Note (move back to normal notes)
export const unhideNote = async (id) => {
  try {
    const existingHidden = await AsyncStorage.getItem(HIDDEN_NOTES_KEY);
    let hiddenNotes = existingHidden ? JSON.parse(existingHidden) : [];

    const noteToUnhide = hiddenNotes.find((note) => note.id === id);
    if (!noteToUnhide) return;

    hiddenNotes = hiddenNotes.filter((note) => note.id !== id);
    await AsyncStorage.setItem(HIDDEN_NOTES_KEY, JSON.stringify(hiddenNotes));

    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    const notes = existingNotes ? JSON.parse(existingNotes) : [];
    notes.push(noteToUnhide);

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error unhiding note:", error);
  }
};

export const searchNotes = async (query) => {
  try {
    const existingNotes = await AsyncStorage.getItem(NOTES_KEY);
    let notes = existingNotes ? JSON.parse(existingNotes) : [];

    if (!query || query.trim() === "") {
      return notes; // return all if query is empty
    }

    const lowerQuery = query.toLowerCase();

    const filtered = notes.filter(
      (note) =>
        note.title?.toLowerCase().includes(lowerQuery) ||
        // note.description?.toLowerCase().includes(lowerQuery) ||
        note.author?.toLowerCase().includes(lowerQuery)
    );

    return filtered;
  } catch (error) {
    console.error("Error searching notes:", error);
    return [];
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
