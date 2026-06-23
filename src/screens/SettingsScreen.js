import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../auth/AuthContext";

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Settings</Text>

      <Button title="Logout" color="red" onPress={logout} />
    </View>
  );
}
