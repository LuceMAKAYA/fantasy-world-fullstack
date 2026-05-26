import { useState, useEffect } from "react";
import {
  getAventurierById,
  getAventurierCompetences,
  addCompetenceToAventurier,
  removeCompetenceFromAventurier,
} from "../../services/aventurierService";
import { getAllCompetences } from "../../services/competenceService";
import "./AventurierDetail.css";

const CLASSE_EMOJI = {
  MAITRE_D_ARMES: "⚔️",
  ECLAIREUR: "🏹",
  ARCANISTE: "🔮",
  GARDIEN: "🛡️",
  PREDICATEUR: "📖",
};

const CLASSE_LABEL = {
  MAITRE_D_ARMES: "Maître d'armes",
  ECLAIREUR: "Éclaireur",
  ARCANISTE: "Arcaniste",
  GARDIEN: "Gardien",
  PREDICATEUR: "Prédicateur",
};

function getCompetenceEligibility(competence, aventurier, acquiredCompetences) {
  const reasons = [];

  if (
    competence.niveauMinimum &&
    aventurier.niveau < competence.niveauMinimum
  ) {
    reasons.push(`Niveau ${competence.niveauMinimum}+`);
  }

  if (
    competence.classeRequise &&
    aventurier.classe !== competence.classeRequise
  ) {
    reasons.push(
      `Classe ${CLASSE_LABEL[competence.classeRequise] || competence.classeRequise}`,
    );
  }

  if (competence.caracteristiqueMin) {
    const characteristic = competence.caracteristiqueMin.caracteristique;
    const statValue = {
      PHYSIQUE: aventurier.physique,
      MENTAL: aventurier.mental,
      PERCEPTION: aventurier.perception,
    }[characteristic];

    if (statValue == null || statValue < competence.caracteristiqueMin.valeur) {
      reasons.push(
        `${characteristic} ≥ ${competence.caracteristiqueMin.valeur}`,
      );
    }
  }

  if (competence.competencesRequises?.length > 0) {
    const missing = competence.competencesRequises.filter(
      (required) => !acquiredCompetences.some((ac) => ac.id === required.id),
    );
    if (missing.length > 0) {
      reasons.push(
        `Compétences requises: ${missing.map((m) => m.nom).join(", ")}`,
      );
    }
  }

  return {
    eligible: reasons.length === 0,
    reasons,
  };
}

export default function AventurierDetail({ id, role, onBack, onEdit }) {
  const [aventurier, setAventurier] = useState(null);
  const [competences, setCompetences] = useState([]);
  const [allCompetences, setAllCompetences] = useState([]);
  const [selectedCompetenceId, setSelectedCompetenceId] = useState("");
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    async function charger() {
      try {
        setStatus("loading");
        const [data, competencesData, competencesList] = await Promise.all([
          getAventurierById(id),
          getAventurierCompetences(id),
          getAllCompetences(0, 100),
        ]);
        setAventurier(data);
        setCompetences(competencesData);
        setAllCompetences(competencesList.content || []);
        setSelectedCompetenceId("");
        setStatus("success");
      } catch (error) {
        setErrorMessage(error.message);
        setStatus("error");
      }
    }
    charger();
  }, [id]);

  async function refreshCompetences() {
    const competencesData = await getAventurierCompetences(id);
    setCompetences(competencesData);
  }

  async function handleAddCompetence(e) {
    e.preventDefault();
    if (!selectedCompetenceId) return;
    try {
      setActionMessage("");
      await addCompetenceToAventurier(id, selectedCompetenceId);
      await refreshCompetences();
      setSelectedCompetenceId("");
      setActionMessage("✅ Compétence ajoutée à l'aventurier !");
    } catch (error) {
      setActionMessage(`❌ ${error.message}`);
    }
  }

  async function handleRemoveCompetence(competenceId) {
    try {
      setActionMessage("");
      await removeCompetenceFromAventurier(id, competenceId);
      await refreshCompetences();
      setActionMessage("✅ Compétence retirée de l'aventurier");
    } catch (error) {
      setActionMessage(`❌ ${error.message}`);
    }
  }

  if (status === "loading") {
    return <div className="loader">⏳ Chargement...</div>;
  }

  if (status === "error") {
    return (
      <div className="detail-error">
        <p>❌ {errorMessage}</p>
        <button className="btn-secondary" onClick={onBack}>
          ← Retour
        </button>
      </div>
    );
  }

  const competenceEligibility = allCompetences
    .filter((c) => !competences.some((ac) => ac.id === c.id))
    .map((competence) => ({
      competence,
      ...getCompetenceEligibility(competence, aventurier, competences),
    }));

  const availableCompetences = competenceEligibility.filter(
    (entry) => entry.eligible,
  );
  const unavailableCompetences = competenceEligibility.filter(
    (entry) => !entry.eligible,
  );

  return (
    <div className="aventurier-detail">
      <button
        className="btn-secondary btn-back"
        onClick={onBack}
        aria-label="Retour à la liste"
      >
        ← Retour
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <span className="detail-emoji">
            {CLASSE_EMOJI[aventurier.classe]}
          </span>
          <div className="detail-title">
            <h2>{aventurier.nom}</h2>
            <span className="aventurier-classe">
              {aventurier.classe.replace(/_/g, " ")}
            </span>
          </div>
          <span className="detail-niveau">Niv. {aventurier.niveau}</span>
          {onEdit && (
            <button
              className="btn-primary"
              onClick={onEdit}
              aria-label="Modifier l'aventurier"
            >
              ✏️ Modifier
            </button>
          )}
        </div>

        {aventurier.description && (
          <div className="detail-section">
            <h3>Description</h3>
            <p>{aventurier.description}</p>
          </div>
        )}

        <div className="detail-section">
          <h3>Caractéristiques</h3>
          <div className="detail-stats">
            <div className="detail-stat">
              <span className="detail-stat-label">⚔️ Physique</span>
              <span className="detail-stat-value">{aventurier.physique}</span>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(aventurier.physique / 20) * 100}%` }}
                />
              </div>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">🧠 Mental</span>
              <span className="detail-stat-value">{aventurier.mental}</span>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(aventurier.mental / 20) * 100}%` }}
                />
              </div>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-label">👁️ Perception</span>
              <span className="detail-stat-value">{aventurier.perception}</span>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(aventurier.perception / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Compétences acquises</h3>
          {competences.length === 0 ? (
            <p>Aucun pouvoir attribué pour le moment.</p>
          ) : (
            <div className="competence-list">
              {competences.map((competence) => (
                <div key={competence.id} className="competence-item">
                  <div>
                    <strong>{competence.nom}</strong>
                    {competence.description && <p>{competence.description}</p>}
                  </div>
                  {role === "ROLE_ADMIN" && (
                    <button
                      className="btn-secondary competence-remove"
                      onClick={() => handleRemoveCompetence(competence.id)}
                    >
                      Retirer
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {role === "ROLE_ADMIN" && (
          <div className="detail-section">
            <h3>Ajouter une compétence</h3>
            <form className="competence-form" onSubmit={handleAddCompetence}>
              <select
                value={selectedCompetenceId}
                onChange={(e) => setSelectedCompetenceId(e.target.value)}
              >
                <option value="">-- Choisir une compétence --</option>
                {availableCompetences.map((entry) => (
                  <option key={entry.competence.id} value={entry.competence.id}>
                    {entry.competence.nom}
                  </option>
                ))}
                {unavailableCompetences.map((entry) => (
                  <option
                    key={entry.competence.id}
                    value={entry.competence.id}
                    disabled
                  >
                    {entry.competence.nom} — {entry.reasons.join(" ; ")}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn-primary"
                disabled={!selectedCompetenceId}
              >
                Ajouter
              </button>
            </form>
            {unavailableCompetences.length > 0 && (
              <p className="competence-note">
                Certaines compétences sont désactivées car l'aventurier ne
                remplit pas les prérequis.
              </p>
            )}
            {actionMessage && <p className="action-message">{actionMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
