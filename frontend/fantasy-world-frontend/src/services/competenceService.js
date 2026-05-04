import apiClient from "./apiClient";

const URL = "/competences";

export async function getAllCompetences(page = 0, size = 6) {
  const response = await apiClient(`${URL}?page=${page}&size=${size}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur lors de la récupération");
  }
  return response.json();
}

export async function getCompetenceById(id) {
  const response = await apiClient(`${URL}/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Compétence non trouvée");
  }
  return response.json();
}

export async function createCompetence(data) {
  const response = await apiClient(URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur lors de la création");
  }
  return response.json();
}

export async function updateCompetence(id, data) {
  const response = await apiClient(`${URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    // 409 → aventuriers impactés
    if (response.status === 409) {
      const err = new Error(error.detail || "Modification impossible");
      err.aventuriersImpactes = error.aventuriersImpactes;
      throw err;
    }
    throw new Error(error.detail || "Erreur lors de la modification");
  }
  return response.json();
}