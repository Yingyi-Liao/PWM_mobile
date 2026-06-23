import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import api from "../api/api";

export default function EditPWDScreen({ route, navigation }) {
  const { id } = route.params;

  const [sourceName, setSourceName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  // Load existing password (without revealing)
  const load = async () => {
    try {
      const res = await api.get(`/SavedPWD/${id}`);
      setAccount(res.data.account);
      setDescription(res.data.description || "");
      setSourceName(res.data.source);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to load password");
    }
  };

  // Reveal password (POST)
  const reveal = async () => {
    try {
      const res = await api.post(`/SavedPWD/${id}/reveal`);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to reveal password");
    }
  };

  // Save changes
  const save = async () => {
    try {
      await api.put(`/SavedPWD/${id}`, {
        account,
        password,
        description,
      });
      Alert.alert("Success", "Password updated");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to save changes");
    }
  };

  // Delete = archive (soft delete)
  const archive = async () => {
    Alert.alert(
      "Archive Password",
      "Are you sure you want to archive this password?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Archive",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/SavedPWD/${id}`);
              navigation.goBack();
            } catch (err) {
              console.log(err);
              Alert.alert("Error", "Failed to archive");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={sourceName}
        editable={false}
        style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 12,
            backgroundColor: "#eee",
            color: "#555"
        }}
/>
    
      <TextInput
        placeholder="Account"
        value={account}
        onChangeText={setAccount}
        style={{ borderWidth: 1, padding: 10, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Password (tap Reveal)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={password === ""}
        style={{ borderWidth: 1, padding: 10, marginBottom: 12 }}
      />

      <Button title="Reveal Password" onPress={reveal} />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 12,
          height: 100,
          textAlignVertical: "top",
        }}
        multiline
      />

      <Button title="Save Changes" onPress={save} />

      <View style={{ height: 12 }} />

      <Button title="Archive" color="red" onPress={archive} />
    </View>
  );
}
