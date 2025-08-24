import AsyncStorage from "@react-native-async-storage/async-storage";

const TODOS_KEY = "TODOS_KEY";


// ✅ Add a new Todo
export const addTodo = async (todo) => {
  try {
    const existingTodos = await AsyncStorage.getItem(TODOS_KEY);
    const todos = existingTodos ? JSON.parse(existingTodos) : [];
    todos.push(todo);
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};


// ✅ Get all Todos
export const getTodos = async () => {
  try {
    const todos = await AsyncStorage.getItem(TODOS_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};


// ✅ Update a Todo (title, description, etc.)
export const updateTodo = async (id, updatedTodo) => {
  try {
    const existingTodos = await AsyncStorage.getItem(TODOS_KEY);
    let todos = existingTodos ? JSON.parse(existingTodos) : [];
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};


// ✅ Delete a Todo
export const deleteTodo = async (id) => {
  try {
    const existingTodos = await AsyncStorage.getItem(TODOS_KEY);
    let todos = existingTodos ? JSON.parse(existingTodos) : [];
    todos = todos.filter((todo) => todo.id !== id);
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};


// ✅ Toggle Completed / Not Completed
export const toggleTodoCompleted = async (id) => {
  try {
    const existingTodos = await AsyncStorage.getItem(TODOS_KEY);
    let todos = existingTodos ? JSON.parse(existingTodos) : [];
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error toggling todo completion:", error);
  }
};


// ✅ Clear All Todos
export const clearAllTodos = async () => {
  try {
    await AsyncStorage.removeItem(TODOS_KEY);
  } catch (error) {
    console.error("Error clearing todos:", error);
  }
};
