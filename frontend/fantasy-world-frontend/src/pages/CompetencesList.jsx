import { useState, useEffect } from "react";
import { getAllCompetences } from "../services/competenceService";
import "./CompetencesList.css";

export default function CompetencesList({ onSelect, onCreateClick, canCreate }) {
  const [competences, setCompetences] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => { charger(page); }, [page]);

  async function charger(currentPage) {
    try {
      setStatus("loading");
      const data = await getAllCompetences(currentPage, 6);
      setCompetences(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  }

  return (
    <div className="competences-list">
      <div className="competences-header">
        <h2>📚 Les Compétences</h2>
        <div className="header-actions">
          <span className="competences-count">{totalElements} compétence(s)</span>
          {canCreate && (
            <button className="btn-primary" onClick={onCreateClick}>
              + Nouvelle compétence
            </button>
          )}
        </div>
      </div>

      {status === "loading" && <div className="loader">⏳ Chargement...</div>}
      {status === "error" && (
        <div className="alert alert-error">❌ {errorMessage}</div>
      )}

      {status === "success" && competences.length === 0 && (
        <div className="empty-state">
          <p>📭 Aucune compétence pour l'instant.</p>
        </div>
      )}

      {status === "success" && competences.length > 0 && (
        <>
          <table className="competences-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Classe requise</th>
                <th>Niveau min.</th>
                <th>Prérequis</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {competences.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.nom}</strong></td>
                  <td>{c.description || <em>—</em>}</td>
                  <td>{c.classeRequise?.replace(/_/g, " ") || "—"}</td>
                  <td>{c.niveauMinimum || "—"}</td>
                  <td>
                    {c.competencesRequises?.length > 0
                      ? c.competencesRequises.map(p => p.nom).join(", ")
                      : "—"}
                  </td>
                  <td>
                    <button className="btn-secondary" onClick={() => onSelect(c.id)}>
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
                className="btn-secondary">← Préc.</button>
              <span>{page + 1} / {totalPages}</span>
              <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}
                className="btn-secondary">Suiv. →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}