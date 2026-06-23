import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../api/client";

export default function HomeScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/SavedPWD").then((res) => setItems(res.data));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.savedPWDId.toString()}
        renderItem={({ item }) => (
          <Text>{item.account} — {item.source}</Text>
        )}
      />
    </View>
  );
}
