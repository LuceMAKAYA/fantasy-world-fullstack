import { useState, useEffect } from "react";
import { getCompetenceById } from "../services/competenceService";

export default function CompetenceDetail({ id, onBack, onEdit, canEdit }) {
  const [competence, setCompetence] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getCompetenceById(id)
      .then(data => { setCompetence(data); setStatus("success"); })
      .catch(err => { setErrorMessage(err.message); setStatus("error"); });
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
          <h2>📖 {competence.nom}</h2>
          {canEdit && (
            <button className="btn-primary" onClick={onEdit}>✏️ Modifier</button>
          )}
        </div>

        {competence.description && <p className="detail-desc">{competence.description}</p>}

        <div className="detail-section">
          <h3>Prérequis</h3>
          {!competence.classeRequise && !competence.niveauMinimum
           && !competence.caracteristiqueMin && competence.competencesRequises?.length === 0
            ? <p>Aucun prérequis — accessible à tous.</p>
            : (
              <ul>
                {competence.classeRequise && (
                  <li>Classe : <strong>{competence.classeRequise.replace(/_/g, " ")}</strong></li>
                )}
                {competence.niveauMinimum && (
                  <li>Niveau minimum : <strong>{competence.niveauMinimum}</strong></li>
                )}
                {competence.caracteristiqueMin && (
                  <li>
                    {competence.caracteristiqueMin.caracteristique} ≥{" "}
                    <strong>{competence.caracteristiqueMin.valeur}</strong>
                  </li>
                )}
                {competence.competencesRequises?.map(p => (
                  <li key={p.id}>Compétence requise : <strong>{p.nom}</strong></li>
                ))}
              </ul>
            )}
        </div>
      </div>
    </div>
  );
}