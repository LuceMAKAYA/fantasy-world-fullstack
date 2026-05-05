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
  const response = await apiClient(`${COMPETENCES_URL}/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Compétence non trouvée");
  }
  return await response.json();
}

export async function updateCompetence(id, data) {
  const response = await apiClient(`${COMPETENCES_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erreur lors de la modification");
  }
  return await response.json();
}

// FONCTION DE SUPPRESSION AJOUTÉE
export async function deleteCompetence(id) {
  const response = await apiClient(`${COMPETENCES_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    // Si le code n'est pas 204 (No Content), on gère l'erreur
    let errorMessage = "Erreur lors de la suppression";
    try {
      const error = await response.json();
      errorMessage = error.detail || errorMessage;
    } catch (e) {
      // Dans le cas d'une 403, il n'y a parfois pas de JSON en retour
    }
    throw new Error(errorMessage);
  }
  
  // Pour une 204 (No Content), on ne fait pas de .json() car le corps est vide
  return true;
}