import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import api from "../api/api";

export default function AddPWDScreen({ navigation }) {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [sourceName, setSourceName] = useState("");

    const save = async () => {
    try {
        await api.post("/SavedPWD", {
        account,
        password,
        description,
        sourceName
        });

        navigation.navigate({
        name: "SavedList",
        params: { refresh: Date.now(), message: "Password created successfully" },
        merge: true,
        });

    } catch (err) {
        console.log(err);
        alert("Failed to create password");
    }
    };

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
        let pwd = "";
        for (let i = 0; i < 16; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(pwd);
    };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Source" onChangeText={setSourceName} style={{ borderWidth: 1, marginBottom: 12 }} />  
      <TextInput placeholder="Account" onChangeText={setAccount} style={{ borderWidth: 1, marginBottom: 12 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 12 }} />
      <Button title="Generate Password" onPress={generatePassword} />

      <TextInput
        placeholder="Description"
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginVertical: 12 }}
      />

      <Button title="Save" onPress={save} />
    </View>
  );
}
