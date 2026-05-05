import { useState, useEffect } from "react";
import { getAllCompetences } from "../../services/competenceService";
import "./CompetencesList.css";

const CLASSE_LABEL = {
  MAITRE_D_ARMES: "⚔️ Maître d'armes",
  ECLAIREUR: "🏹 Éclaireur",
  ARCANISTE: "🔮 Arcaniste",
  GARDIEN: "🛡️ Gardien",
  PREDICATEUR: "📖 Prédicateur",
};

export default function CompetencesList({ onSelect, canCreate, onCreate }) {
  const [competences, setCompetences] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    charger(page);
  }, [page]);

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
        <h2>✨ Les Compétences</h2>
        <div className="competences-header-right">
          <span className="competences-count">{totalElements} compétence(s)</span>
          {canCreate && (
            <button className="btn-primary" onClick={onCreate}>
              + Nouvelle compétence
            </button>
          )}
        </div>
      </div>

      {status === "loading" && <div className="loader">⏳ Chargement...</div>}

      {status === "error" && (
        <div className="alert alert-error">
          ❌ {errorMessage}
          <button className="btn-secondary" onClick={() => charger(page)}>
            Réessayer
          </button>
        </div>
      )}

      {status === "success" && competences.length === 0 && (
        <div className="empty-state">
          <p>📚 Aucune compétence pour l'instant.</p>
        </div>
      )}

      {status === "success" && competences.length > 0 && (
        <>
          <div className="competences-grid">
            {competences.map((c) => (
              <div key={c.id} className="competence-card" onClick={() => onSelect(c.id)}>
                <div className="competence-card-header">
                  <h3>{c.nom}</h3>
                  {c.classeRequise && (
                    <span className="competence-classe">
                      {CLASSE_LABEL[c.classeRequise] || c.classeRequise}
                    </span>
                  )}
                </div>

                {c.description && (
                  <p className="competence-desc">{c.description}</p>
                )}

                <div className="competence-prereqs">
                  {c.niveauMinimum && (
                    <span className="prereq-tag">⭐ Niv. {c.niveauMinimum}</span>
                  )}
                  {c.caracteristiqueMin && (
                    <span className="prereq-tag">
                      📊 {c.caracteristiqueMin.caracteristique} ≥ {c.caracteristiqueMin.valeur}
                    </span>
                  )}
                  {c.competencesRequises?.length > 0 && (
                    <span className="prereq-tag">
                      🔗 {c.competencesRequises.length} prérequis
                    </span>
                  )}
                  {!c.niveauMinimum && !c.classeRequise && !c.caracteristiqueMin && c.competencesRequises?.length === 0 && (
                    <span className="prereq-tag prereq-libre">✅ Accessible à tous</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn-secondary"
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
              >
                ← Précédent
              </button>
              <span>{page + 1} / {totalPages}</span>
              <button
                className="btn-secondary"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => p + 1)}
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}