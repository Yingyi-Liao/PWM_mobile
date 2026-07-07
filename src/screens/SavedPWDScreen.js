import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Button,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import api from "../api/api";

export default function SavedPWDScreen({ navigation }) {
  const [passwords, setPasswords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const res = await api.get("/SavedPWD");
      setPasswords(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (!text) return setFiltered(passwords);
    const f = passwords.filter((p) =>
      p.account.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(f);
  };

  const copyPassword = async (pwd) => {
    await Clipboard.setStringAsync(pwd);
    alert("Copied");
  };

  const revealPassword = async (id) => {
    const res = await api.post(`/SavedPWD/${id}/reveal`);
    return res.data.password;
  };

  const deletePassword = async (id) => {
    await api.delete(`/SavedPWD/${id}`); // soft delete → archive
    loadData();
  };

const renderItem = ({ item }) => (
  <View style={{ padding: 16, borderBottomWidth: 1 }}>
    <Text style={{ fontSize: 18, marginBottom: 8 }}>Source: {item.source}</Text>
    <Text style={{ fontSize: 18, marginBottom: 8 }}>Account: {item.account}</Text>

    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      
      {/* EDIT BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.navigate("EditPWD", { id: item.savedPWDId })}
      >
        <Text style={{ marginRight: 20, color: "blue" }}>Edit</Text>
      </TouchableOpacity>

      {/* COPY BUTTON */}
      <TouchableOpacity
        onPress={async () => {
          const pwd = await revealPassword(item.savedPWDId);
          copyPassword(pwd);
        }}
      >
        <Text style={{ marginRight: 20, color: "blue" }}>Copy</Text>
      </TouchableOpacity>

      {/* REVEAL BUTTON */}
      <TouchableOpacity
        onPress={async () => {
          const pwd = await revealPassword(item.savedPWDId);
          alert(pwd);
        }}
      >
        <Text style={{ marginRight: 20, color: "blue" }}>Reveal</Text>
      </TouchableOpacity>

      {/* DELETE (ARCHIVE) BUTTON */}
      <TouchableOpacity onPress={() => deletePassword(item.savedPWDId)}>
        <Text style={{ color: "red" }}>Delete</Text>
      </TouchableOpacity>

    </View>
  </View>
);


  return (
    <View style={{ flex: 1 }}>
      {/* Create Button */}
      <View style={{ padding: 12 }}>
        <Button
          title="Create New Password"
          onPress={() => navigation.navigate("AddPWD")}
        />
      </View>

      {/* Search Bar */}
      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={handleSearch}
        style={{
          padding: 12,
          borderWidth: 1,
          marginHorizontal: 12,
          marginBottom: 12,
          borderRadius: 8,
        }}
      />

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.savedPWDId.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
