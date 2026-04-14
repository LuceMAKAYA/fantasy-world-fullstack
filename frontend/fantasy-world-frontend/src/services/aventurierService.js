import apiClient from "./apiClient";

const AVENTURIERS_URL = "/aventuriers";

export async function getAllAventuriers(page = 0, size = 6) {
  try {
    const response = await apiClient(
      `${AVENTURIERS_URL}?page=${page}&size=${size}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erreur lors de la récupération");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erreur réseau");
  }
}

export async function getAventurierById(id) {
  try {
    const response = await apiClient(`${AVENTURIERS_URL}/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Aventurier non trouvé");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erreur réseau");
  }
}

export async function createAventurier(data) {
  try {
    const response = await apiClient(AVENTURIERS_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erreur lors de la création");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erreur réseau");
  }
}

export async function deleteAventurier(id) {
  try {
    const response = await apiClient(`${AVENTURIERS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erreur lors de la suppression");
    }
  } catch (error) {
    throw new Error(error.message || "Erreur réseau");
  }
}