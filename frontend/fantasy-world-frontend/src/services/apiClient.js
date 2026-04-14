import { getToken } from "./authService";

const API_BASE = "http://localhost:8080";

async function apiClient(url, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  // Intercepteur 401 → déconnexion + redirect login
  if (response.status === 401) {
    sessionStorage.clear();
    window.location.href = "/";
    throw new Error("Session expirée, veuillez vous reconnecter");
  }

  // Intercepteur 403 → page accès interdit
  if (response.status === 403) {
    throw new Error("FORBIDDEN");
  }

  return response;
}

export default apiClient;