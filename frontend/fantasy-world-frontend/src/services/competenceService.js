import apiClient from "./apiClient";


const COMPETENCES_URL = "/competences";

export async function getAllCompetences(page = 0, size = 6) {
  const response = await apiClient(`${COMPETENCES_URL}?page=${page}&size=${size}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur lors de la récupération");
  }
  return await response.json();
}