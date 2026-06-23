import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SavedPWDScreen from "../screens/SavedPWDScreen";
import ArchivedPWDScreen from "../screens/ArchivedPWDScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddPWDScreen from "../screens/AddPWDScreen";
import EditPWDScreen from "../screens/EditPWDScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";   // ← FIXED

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function SavedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SavedList" component={SavedPWDScreen} options={{ title: "Saved Passwords" }} />
      <Stack.Screen name="AddPWD" component={AddPWDScreen} options={{ title: "Create Password" }} />
      <Stack.Screen name="EditPWD" component={EditPWDScreen} options={{ title: "Edit Password" }} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Saved") {
            iconName = focused ? "lock-closed" : "lock-closed-outline";
          } else if (route.name === "Archived") {
            iconName = focused ? "archive" : "archive-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Saved" component={SavedStack} />
      <Tab.Screen name="Archived" component={ArchivedPWDScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
