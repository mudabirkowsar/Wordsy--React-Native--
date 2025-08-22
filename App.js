import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import SplashScreen from "./src/screens/SplashScreen";
import NoteEdit from "./src/screens/NoteEdit";
import LockedNotesScreen from "./src/screens/LockedNotesScreen";
import SetUpLockScreen from "./src/screens/SetUpLockScreen";
import CheckPassword from "./src/screens/CheckPassword";
import AddNotesScreen from "./src/screens/AddNotesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">

        <Stack.Screen
          name='Splash'
          component={SplashScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "My Notes", headerShown: false }}
        />

        <Stack.Screen
          name='EditNote'
          component={NoteEdit}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='LockedNotes'
          component={LockedNotesScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='SetLock'
          component={SetUpLockScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='CheckPassword'
          component={CheckPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='AddNote'
          component={AddNotesScreen}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
