import { useState, useEffect } from "react";
import { getAllAventuriers, deleteAventurier } from "../services/aventurierService";
import AventurierCard from "../components/aventuriers/AventurierCard";
import Pagination from "../components/aventuriers/Pagination";
import "./AventuriersList.css";

export default function AventuriersList({ onSelect, canDelete = false }) {
  const [aventuriers, setAventuriers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    chargerAventuriers(page);
  }, [page]);

  async function chargerAventuriers(currentPage) {
    try {
      setStatus("loading");
      const data = await getAllAventuriers(currentPage, 6);
      setAventuriers(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cet aventurier ?")) return;
    try {
      await deleteAventurier(id);
      // Recharge la page courante après suppression
      chargerAventuriers(page);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="aventuriers-list">
      <div className="aventuriers-header">
        <h2>⚔️ Les Aventuriers</h2>
        <span className="aventuriers-count">
          {totalElements} aventurier(s)
        </span>
      </div>

      {status === "loading" && (
        <div className="loader">⏳ Chargement des aventuriers...</div>
      )}

      {status === "error" && (
        <div className="alert alert-error">
          <span>❌ {errorMessage}</span>
          <button
            className="btn-secondary"
            onClick={() => chargerAventuriers(page)}
          >
            Réessayer
          </button>
        </div>
      )}

      {status === "success" && aventuriers.length === 0 && (
        <div className="empty-state">
          <p>🏰 Aucun aventurier pour l'instant.</p>
          <p>Créez votre premier aventurier !</p>
        </div>
      )}

      {aventuriers.map((aventurier) => (
          <AventurierCard
            key={aventurier.id}
            aventurier={aventurier}
            onSelect={onSelect}
            onDelete={handleDelete}
            canDelete={canDelete}  // ← ajoute ça
          />
        ))}

      {status === "success" && aventuriers.length > 0 && (
        <>
          <div className="aventuriers-grid">
            {aventuriers.map((aventurier) => (
              <AventurierCard
                key={aventurier.id}
                aventurier={aventurier}
                onSelect={onSelect}
                onDelete={handleDelete}
              />
            ))}
          </div>


          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}