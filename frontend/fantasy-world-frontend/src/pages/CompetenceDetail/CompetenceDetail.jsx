import { useState, useEffect } from "react";
import { getCompetenceById, deleteCompetence } from "../../services/competenceService";
import "./CompetenceDetail.css";

const CLASSE_LABEL = {
  MAITRE_D_ARMES: "⚔️ Maître d'armes",
  ECLAIREUR: "🏹 Éclaireur",
  ARCANISTE: "🔮 Arcaniste",
  GARDIEN: "🛡️ Gardien",
  PREDICATEUR: "📖 Prédicateur",
};

export default function CompetenceDetail({ id, onBack, onEdit, role }) {
  const [competence, setCompetence] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    
    getCompetenceById(id)
      .then((data) => { 
        setCompetence(data); 
        setStatus("success"); 
      })
      .catch((err) => { 
        setErrorMessage(err.message); 
        setStatus("error"); 
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Voulez-vous vraiment effacer "${competence?.nom}" du Grimoire ?`)) {
      try {
        await deleteCompetence(id);
        alert("Savoir ancestral supprimé !");
        onBack(); // Retourne à la liste
      } catch (err) {
        alert("Erreur : Impossible de supprimer la compétence.");
      }
    }
  };

  // 1. Gestion du chargement
  if (status === "loading") return <div className="loader">⏳ Chargement du savoir...</div>;

  // 2. Gestion de l'erreur
  if (status === "error") return (
    <div className="detail-error">
      <p>❌ {errorMessage}</p>
      <button className="btn-secondary" onClick={onBack}>← Retour</button>
    </div>
  );

  // 3. Sécurité Anti-Crash : Si competence est encore null malgré le status success
  if (!competence) return null;

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
          
          {/* Actions réservées aux ADMINS */}
          {role === "ROLE_ADMIN" && (
            <div className="detail-actions">
              {onEdit && (
                <button className="btn-primary" onClick={onEdit}>✏️ Modifier</button>
              )}
              <button className="btn-danger" onClick={handleDelete}>
                🗑 Supprimer
              </button>
            </div>
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
           !competence.caracteristiqueMin && (!competence.competencesRequises || competence.competencesRequises.length === 0) ? (
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