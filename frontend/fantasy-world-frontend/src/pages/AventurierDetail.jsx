import { useState, useEffect } from "react";
import { getAventurierById } from "../services/aventurierService";
import "./AventurierDetail.css";

const CLASSE_EMOJI = {
  MAITRE_D_ARMES: "⚔️",
  ECLAIREUR: "🏹",
  ARCANISTE: "🔮",
  GARDIEN: "🛡️",
  PREDICATEUR: "📖",
};

export default function AventurierDetail({ id, onBack }) {
  const [aventurier, setAventurier] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function charger() {
      try {
        setStatus("loading");
        const data = await getAventurierById(id);
        setAventurier(data);
        setStatus("success");
      } catch (error) {
        setErrorMessage(error.message);
        setStatus("error");
      }
    }
    charger();
  }, [id]);

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
      </div>
    </div>
  );
}