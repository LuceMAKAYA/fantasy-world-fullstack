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

export async function getCompetenceById(id) {
  const response = await apiClient(`/competences/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Compétence non trouvée");
  }
  return await response.json();
}

export async function updateCompetence(id, data) {
  const response = await apiClient(`/competences/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur lors de la modification");
  }
  return await response.json();
}