const AUTH_URL = "http://localhost:8081/auth";
const TOKEN_KEY = "fantasy_token";
const USERNAME_KEY = "fantasy_username";
const ROLE_KEY = "fantasy_role";

export async function login(username, password) {
  try {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Identifiants invalides");
    }

    const data = await response.json();
    sessionStorage.setItem(TOKEN_KEY, data.token);
    sessionStorage.setItem(USERNAME_KEY, data.username);
    // On stocke le rôle basé sur le username pour le TP
    const role = data.username === "admin" ? "ADMIN" : "USER";
    sessionStorage.setItem(ROLE_KEY, role);
    return { ...data, role };
  } catch (error) {
    throw new Error(error.message || "Erreur réseau");
  }
}

export function logout() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USERNAME_KEY);
  sessionStorage.removeItem(ROLE_KEY);
}

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getUsername() {
  return sessionStorage.getItem(USERNAME_KEY);
}

export function getRole() {
  return sessionStorage.getItem(ROLE_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

export function isAdmin() {
  return getRole() === "ADMIN";
}