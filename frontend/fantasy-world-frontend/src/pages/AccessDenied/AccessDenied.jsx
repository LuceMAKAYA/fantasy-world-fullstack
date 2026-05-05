import "./AccessDenied.css";

export default function AccessDenied({ onBack }) {
  return (
    <div className="access-denied">
      <div className="access-denied-card">
        <span className="access-denied-icon">🚫</span>
        <h2>Accès interdit</h2>
        <p>Vous n'avez pas les droits pour accéder à cette page.</p>
        <button className="btn-secondary" onClick={onBack}>
          ← Retour
        </button>
      </div>
    </div>
  );
}