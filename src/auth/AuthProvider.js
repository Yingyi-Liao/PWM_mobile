import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token on app start
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync("jwt");
      if (storedToken) {
        setToken(storedToken);
        setUser({}); // You can decode token later if needed
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (jwt) => {
    await SecureStore.setItemAsync("jwt", jwt);
    setToken(jwt);
    setUser({});
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("jwt");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
