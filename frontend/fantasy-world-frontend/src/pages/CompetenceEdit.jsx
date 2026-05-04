import { useState, useEffect } from "react";
import { getCompetenceById, updateCompetence, getAllCompetences } from "../services/competenceService";

const CLASSES = [
  { value: "", label: "— Aucune —" },
  { value: "MAITRE_D_ARMES", label: "⚔️ Maître d'armes" },
  { value: "ECLAIREUR", label: "🏹 Éclaireur" },
  { value: "ARCANISTE", label: "🔮 Arcaniste" },
  { value: "GARDIEN", label: "🛡️ Gardien" },
  { value: "PREDICATEUR", label: "📖 Prédicateur" },
];

const CARACS = ["PHYSIQUE", "MENTAL", "PERCEPTION"];

export default function CompetenceEdit({ id, onSuccess, onBack }) {
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [aventuriersImpactes, setAventuriersImpactes] = useState([]);
  const [toutesCompetences, setToutesCompetences] = useState([]);

  useEffect(() => {
    Promise.all([getCompetenceById(id), getAllCompetences(0, 50)])
      .then(([competence, page]) => {
        setForm({
          nom: competence.nom,
          description: competence.description || "",
          classeRequise: competence.classeRequise || "",
          niveauMinimum: competence.niveauMinimum || "",
          caracType: competence.caracteristiqueMin?.caracteristique || "",
          caracValeur: competence.caracteristiqueMin?.valeur || "",
          competencesRequises: competence.competencesRequises?.map(p => p.id) || [],
        });
        // Exclut la compétence elle-même de la liste
        setToutesCompetences(page.content.filter(c => c.id !== id));
        setStatus("idle");
      })
      .catch(err => { setErrorMessage(err.message); setStatus("error"); });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePrerequisToggle(competenceId) {
    setForm(f => ({
      ...f,
      competencesRequises: f.competencesRequises.includes(competenceId)
        ? f.competencesRequises.filter(i => i !== competenceId)
        : [...f.competencesRequises, competenceId]
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
    setAventuriersImpactes([]);
    try {
      setStatus("loading");
      await updateCompetence(id, {
        nom: form.nom,
        description: form.description || null,
        classeRequise: form.classeRequise || null,
        niveauMinimum: form.niveauMinimum ? parseInt(form.niveauMinimum) : null,
        caracteristiqueMin: form.caracType ? {
          caracteristique: form.caracType,
          valeur: parseInt(form.caracValeur)
        } : null,
        competencesRequises: form.competencesRequises,
      });
      setStatus("success");
      onSuccess();
    } catch (error) {
      setErrorMessage(error.message);
      if (error.aventuriersImpactes) {
        setAventuriersImpactes(error.aventuriersImpactes);
      }
      setStatus("error");
    }
  }

  if (status === "loading" && !form) return <div className="loader">⏳ Chargement...</div>;

  return (
    <div className="aventurier-create">
      <h2>✏️ Modifier la compétence</h2>

      {status === "error" && (
        <div className="alert alert-error">
          ❌ {errorMessage}
          {aventuriersImpactes.length > 0 && (
            <div className="aventuriers-impactes">
              <p><strong>Aventuriers impactés :</strong></p>
              <ul>
                {aventuriersImpactes.map(a => (
                  <li key={a.id}>
                    {a.nom} — {a.prerequisManquants?.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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
          <input name="niveauMinimum" type="number" min="1" max="100"
            value={form.niveauMinimum} onChange={handleChange} />
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
                <input name="caracValeur" type="number" min="1" max="20"
                  value={form.caracValeur} onChange={handleChange} />
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
                  <input type="checkbox"
                    checked={form.competencesRequises.includes(c.id)}
                    onChange={() => handlePrerequisToggle(c.id)} />
                  {c.nom}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>← Annuler</button>
          <button type="submit" className="btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "⏳ Sauvegarde..." : "✅ Sauvegarder"}
          </button>
        </div>
      </form>
    </div>
  );
}