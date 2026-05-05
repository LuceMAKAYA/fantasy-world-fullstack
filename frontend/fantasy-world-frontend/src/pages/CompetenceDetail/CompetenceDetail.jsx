import { useState, useEffect } from "react";
import { getCompetenceById } from "../../services/competenceService";
import "./CompetenceDetail.css";

const CLASSE_LABEL = {
  MAITRE_D_ARMES: "⚔️ Maître d'armes",
  ECLAIREUR: "🏹 Éclaireur",
  ARCANISTE: "🔮 Arcaniste",
  GARDIEN: "🛡️ Gardien",
  PREDICATEUR: "📖 Prédicateur",
};

export default function CompetenceDetail({ id, onBack, onEdit }) {
  const [competence, setCompetence] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getCompetenceById(id)
      .then((data) => { setCompetence(data); setStatus("success"); })
      .catch((err) => { setErrorMessage(err.message); setStatus("error"); });
  }, [id]);

  if (status === "loading") return <div className="loader">⏳ Chargement...</div>;

  if (status === "error") return (
    <div className="detail-error">
      <p>❌ {errorMessage}</p>
      <button className="btn-secondary" onClick={onBack}>← Retour</button>
    </div>
  );

  return (
    <div className="competence-detail">
      <button className="btn-secondary btn-back" onClick={onBack}>← Retour</button>

      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-title">
            <h2>✨ {competence.nom}</h2>
            {competence.classeRequise && (
              <span className="competence-classe">
                {CLASSE_LABEL[competence.classeRequise] || competence.classeRequise}
              </span>
            )}
          </div>
          {onEdit && (
            <button className="btn-primary" onClick={onEdit}>✏️ Modifier</button>
          )}
        </div>

        {competence.description && (
          <div className="detail-section">
            <h3>Description</h3>
            <p>{competence.description}</p>
          </div>
        )}

        <div className="detail-section">
          <h3>Prérequis</h3>
          {!competence.niveauMinimum && !competence.classeRequise &&
           !competence.caracteristiqueMin && competence.competencesRequises?.length === 0 ? (
            <p className="prereq-libre">✅ Accessible à tous — aucun prérequis</p>
          ) : (
            <div className="prereqs-list">
              {competence.niveauMinimum && (
                <div className="prereq-item">
                  <span className="prereq-label">⭐ Niveau minimum</span>
                  <span className="prereq-value">{competence.niveauMinimum}</span>
                </div>
              )}
              {competence.classeRequise && (
                <div className="prereq-item">
                  <span className="prereq-label">🎭 Classe requise</span>
                  <span className="prereq-value">
                    {CLASSE_LABEL[competence.classeRequise] || competence.classeRequise}
                  </span>
                </div>
              )}
              {competence.caracteristiqueMin && (
                <div className="prereq-item">
                  <span className="prereq-label">📊 Caractéristique</span>
                  <span className="prereq-value">
                    {competence.caracteristiqueMin.caracteristique} ≥ {competence.caracteristiqueMin.valeur}
                  </span>
                </div>
              )}
              {competence.competencesRequises?.length > 0 && (
                <div className="prereq-item prereq-competences">
                  <span className="prereq-label">🔗 Compétences requises</span>
                  <ul>
                    {competence.competencesRequises.map((c) => (
                      <li key={c.id}>{c.nom}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}