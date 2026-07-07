import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, Button } from "react-native";
import api from "../api/api";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../auth/AuthContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");

  useEffect(() => {
    const loadServer = async () => {
      const saved = await SecureStore.getItemAsync("serverAddress");
      if (saved) {
        setServer(saved);
      }
    };
    loadServer();
  }, []);

  const normalizeServer = (value) => {
    let v = value.trim().toLowerCase();
    if (!v.startsWith("http://") && !v.startsWith("https://")) {
      v = "http://" + v;
    }
    return v;
  };

  const handleLogin = async () => {
    try {
      const normalized = normalizeServer(server);
      await SecureStore.setItemAsync("serverAddress", normalized);

      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
    } catch (err) {
      alert("Invalid credentials or server unreachable");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Server (e.g. 192.168.1.50:5000)"
        value={server}
        onChangeText={setServer}
      />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
