import { useEffect, useRef } from "react";
import "./AventurierCard.css";

const CLASSE_CONFIG = {
  MAITRE_D_ARMES: { emoji: "⚔️", css: "blade", label: "Blade Master" },
  ECLAIREUR:      { emoji: "🏹", css: "scout", label: "Scout" },
  ARCANISTE:      { emoji: "🔮", css: "arcane", label: "Arcanist" },
  GARDIEN:        { emoji: "🛡️", css: "guardian", label: "Guardian" },
  PREDICATEUR:    { emoji: "📖", css: "herald", label: "Herald" },
};

function getRarity(niveau) {
  if (niveau >= 10) return { label: "✦ Legendary", css: "legendary" };
  if (niveau >= 5)  return { label: "◈ Rare", css: "rare" };
  return { label: "○ Common", css: "common" };
}

function StatBar({ value, max = 20 }) {
  const fillRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (fillRef.current) {
        fillRef.current.style.width = `${(value / max) * 100}%`;
      }
    }, 300);
    return () => clearTimeout(t);
  }, [value, max]);
  return (
    <div className="stat-bar">
      <div className="stat-bar-fill" ref={fillRef} />
    </div>
  );
}

export default function AventurierCard({ aventurier, onSelect, onDelete, canDelete = false }) {
  const config = CLASSE_CONFIG[aventurier.classe] || CLASSE_CONFIG.MAITRE_D_ARMES;
  const rarity = getRarity(aventurier.niveau);
  const xpPct = ((aventurier.niveau % 1) * 100) || Math.floor(Math.random() * 80 + 10);

  const xpRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (xpRef.current) xpRef.current.style.width = `${xpPct}%`;
    }, 500);
    return () => clearTimeout(t);
  }, [xpPct]);

  return (
    <div className={`aventurier-card class-${config.css}`}>
      <div className="card-top">
        <span className="card-emoji">{config.emoji}</span>
        <div className="card-top-right">
          <span className={`rarity ${rarity.css}`}>{rarity.label}</span>
          <span className="card-lvl">Lv. {aventurier.niveau}</span>
          <div className="xp-bar">
            <div className="xp-fill" ref={xpRef} />
          </div>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-name">{aventurier.nom}</h3>
        <span className="card-class">{config.label}</span>
        {aventurier.description && (
          <p className="card-desc">{aventurier.description}</p>
        )}
      </div>

      <div className="card-stats">
        <div className="stat">
          <span className="stat-icon">⚔️</span>
          <span className="stat-val">{aventurier.physique}</span>
          <StatBar value={aventurier.physique} />
          <span className="stat-lbl">Phy</span>
        </div>
        <div className="stat">
          <span className="stat-icon">🧠</span>
          <span className="stat-val">{aventurier.mental}</span>
          <StatBar value={aventurier.mental} />
          <span className="stat-lbl">Men</span>
        </div>
        <div className="stat">
          <span className="stat-icon">👁️</span>
          <span className="stat-val">{aventurier.perception}</span>
          <StatBar value={aventurier.perception} />
          <span className="stat-lbl">Per</span>
        </div>
      </div>

      <div className="card-footer">
        <button
          className="btn-secondary"
          onClick={() => onSelect(aventurier.id)}
          aria-label={`Voir ${aventurier.nom}`}
        >
          View
        </button>
        {canDelete && (
          <button
            className="btn-danger"
            onClick={() => onDelete(aventurier.id)}
            aria-label={`Supprimer ${aventurier.nom}`}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}