import { useState, useEffect } from "react";
import { getCompetenceById, updateCompetence, getAllCompetences } from "../../services/competenceService";
import "./CompetenceEdit.css";

const CLASSES = [
  { value: "", label: "— Aucune classe requise —" },
  { value: "MAITRE_D_ARMES", label: "⚔️ Maître d'armes" },
  { value: "ECLAIREUR", label: "🏹 Éclaireur" },
  { value: "ARCANISTE", label: "🔮 Arcaniste" },
  { value: "GARDIEN", label: "🛡️ Gardien" },
  { value: "PREDICATEUR", label: "📖 Prédicateur" },
];

const CARACTERISTIQUES = ["PHYSIQUE", "MENTAL", "PERCEPTION"];

export default function CompetenceEdit({ id, onSuccess, onBack }) {
  const [form, setForm] = useState(null);
  const [toutesCompetences, setToutesCompetences] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    Promise.all([
      getCompetenceById(id),
      getAllCompetences(0, 100)
    ]).then(([data, toutes]) => {
      setForm({
        nom: data.nom,
        description: data.description || "",
        classeRequise: data.classeRequise || "",
        niveauMinimum: data.niveauMinimum || "",
        caracteristiqueMin: data.caracteristiqueMin
          ? { caracteristique: data.caracteristiqueMin.caracteristique, valeur: data.caracteristiqueMin.valeur }
          : null,
        competencesRequises: data.competencesRequises?.map(c => c.id) || [],
      });
      // Exclut la compétence elle-même de la liste des prérequis possibles
      setToutesCompetences(toutes.content.filter(c => c.id !== id));
      setStatus("idle");
    }).catch((err) => {
      setErrorMessage(err.message);
      setStatus("error");
    });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCaracChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      caracteristiqueMin: { ...(form.caracteristiqueMin || { caracteristique: "PHYSIQUE", valeur: 1 }), [name]: value }
    });
  }

  function togglePrerequisCompetence(competenceId) {
    const existe = form.competencesRequises.includes(competenceId);
    setForm({
      ...form,
      competencesRequises: existe
        ? form.competencesRequises.filter(id => id !== competenceId)
        : [...form.competencesRequises, competenceId]
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
    try {
      setStatus("loading");
      await updateCompetence(id, {
        nom: form.nom,
        description: form.description || null,
        classeRequise: form.classeRequise || null,
        niveauMinimum: form.niveauMinimum ? parseInt(form.niveauMinimum) : null,
        caracteristiqueMin: form.caracteristiqueMin
          ? { caracteristique: form.caracteristiqueMin.caracteristique, valeur: parseInt(form.caracteristiqueMin.valeur) }
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

  if (status === "loading" && !form) return <div className="loader">⏳ Chargement...</div>;

  return (
    <div className="competence-edit">
      <h2>✏️ Modifier la compétence</h2>

      {status === "error" && <div className="alert alert-error">❌ {errorMessage}</div>}

      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom *</label>
          <input id="nom" name="nom" type="text" value={form.nom} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={3} />
        </div>

        <div className="form-group">
          <label htmlFor="classeRequise">Classe requise</label>
          <select id="classeRequise" name="classeRequise" value={form.classeRequise} onChange={handleChange}>
            {CLASSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="niveauMinimum">Niveau minimum</label>
          <input id="niveauMinimum" name="niveauMinimum" type="number" min="1" max="100"
            value={form.niveauMinimum} onChange={handleChange} placeholder="Aucun" />
        </div>

        <div className="form-group">
          <label>Caractéristique minimum</label>
          <div className="carac-group">
            <select name="caracteristique" value={form.caracteristiqueMin?.caracteristique || "PHYSIQUE"}
              onChange={handleCaracChange}>
              {CARACTERISTIQUES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input name="valeur" type="number" min="1" max="20"
              value={form.caracteristiqueMin?.valeur || ""}
              onChange={handleCaracChange} placeholder="Valeur min" />
            <button type="button" className="btn-secondary"
              onClick={() => setForm({ ...form, caracteristiqueMin: null })}>
              ✕ Retirer
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Compétences requises</label>
          <div className="competences-checkboxes">
            {toutesCompetences.map(c => (
              <label key={c.id} className="checkbox-label">
                <input type="checkbox" checked={form.competencesRequises.includes(c.id)}
                  onChange={() => togglePrerequisCompetence(c.id)} />
                {c.nom}
              </label>
            ))}
          </div>
        </div>

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