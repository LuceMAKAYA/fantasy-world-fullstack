import { useState, useEffect } from "react";
import { createCompetence, getAllCompetences } from "../services/competenceService";

const CLASSES = [
  { value: "", label: "— Aucune —" },
  { value: "MAITRE_D_ARMES", label: "⚔️ Maître d'armes" },
  { value: "ECLAIREUR", label: "🏹 Éclaireur" },
  { value: "ARCANISTE", label: "🔮 Arcaniste" },
  { value: "GARDIEN", label: "🛡️ Gardien" },
  { value: "PREDICATEUR", label: "📖 Prédicateur" },
];

const CARACS = ["PHYSIQUE", "MENTAL", "PERCEPTION"];

export default function CompetenceCreate({ onSuccess, onBack }) {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    classeRequise: "",
    niveauMinimum: "",
    caracType: "",
    caracValeur: "",
    competencesRequises: [],
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [toutesCompetences, setToutesCompetences] = useState([]);

  useEffect(() => {
    getAllCompetences(0, 50)
      .then(page => setToutesCompetences(page.content))
      .catch(() => {}); // pas bloquant
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePrerequisToggle(competenceId) {
    setForm(f => ({
      ...f,
      competencesRequises: f.competencesRequises.includes(competenceId)
        ? f.competencesRequises.filter(i => i !== competenceId)
        : [...f.competencesRequises, competenceId],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
    setErrorMessage("");
    try {
      setStatus("loading");
      await createCompetence({
        nom: form.nom,
        description: form.description || null,
        classeRequise: form.classeRequise || null,
        niveauMinimum: form.niveauMinimum ? parseInt(form.niveauMinimum) : null,
        caracteristiqueMin: form.caracType
          ? { caracteristique: form.caracType, valeur: parseInt(form.caracValeur) }
          : null,
        competencesRequises: form.competencesRequises,
      });
      setStatus("success");
      onSuccess();
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  }

  return (
    <div className="aventurier-create">
      <h2>✨ Nouvelle compétence</h2>

      {status === "error" && (
        <div className="alert alert-error">❌ {errorMessage}</div>
      )}

      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom *</label>
          <input name="nom" value={form.nom} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
        </div>

        <div className="form-group">
          <label>Classe requise</label>
          <select name="classeRequise" value={form.classeRequise} onChange={handleChange}>
            {CLASSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Niveau minimum</label>
          <input
            name="niveauMinimum"
            type="number"
            min="1"
            max="100"
            value={form.niveauMinimum}
            onChange={handleChange}
          />
        </div>

        <div className="form-stats">
          <h3>Caractéristique minimale</h3>
          <div className="stats-grid">
            <div className="form-group">
              <label>Caractéristique</label>
              <select name="caracType" value={form.caracType} onChange={handleChange}>
                <option value="">— Aucune —</option>
                {CARACS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {form.caracType && (
              <div className="form-group">
                <label>Valeur minimale</label>
                <input
                  name="caracValeur"
                  type="number"
                  min="1"
                  max="20"
                  value={form.caracValeur}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        {toutesCompetences.length > 0 && (
          <div className="form-group">
            <label>Compétences requises</label>
            <div className="competences-checkboxes">
              {toutesCompetences.map(c => (
                <label key={c.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.competencesRequises.includes(c.id)}
                    onChange={() => handlePrerequisToggle(c.id)}
                  />
                  {c.nom}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>← Annuler</button>
          <button type="submit" className="btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "⏳ Création..." : "✅ Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}