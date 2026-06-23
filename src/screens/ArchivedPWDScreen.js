// src/screens/ArchivedPWDScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../api/api";

export default function ArchivedPWDScreen() {
  const [items, setItems] = useState([]);

  const loadData = async () => {
    try {
      const res = await api.get("/ArchivedPWD");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{item.account}</Text>
      {item.description ? (
        <Text style={{ marginTop: 4, color: "#555" }}>{item.description}</Text>
      ) : null}
    </View>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.archivedPWDId.toString()}
      renderItem={renderItem}
    />
  );
}
