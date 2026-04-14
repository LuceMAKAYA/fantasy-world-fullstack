import { createContext, useContext, useState } from "react";
import { login as loginService, logout as logoutService, getToken, getUsername } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    getToken() ? { username: getUsername(), token: getToken() } : null
  );

  async function login(username, password) {
    const data = await loginService(username, password);
    setUser({ username: data.username, token: data.token });
    return data;
  }

  function logout() {
    logoutService();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}