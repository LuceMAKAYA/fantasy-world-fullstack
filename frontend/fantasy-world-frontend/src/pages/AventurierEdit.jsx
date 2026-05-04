import { useState, useEffect } from "react";
import { getAventurierById, updateAventurier } from "../services/aventurierService";
import "./AventurierCreate.css";

const CLASSES = [
  { value: "MAITRE_D_ARMES", label: "⚔️ Maître d'armes" },
  { value: "ECLAIREUR", label: "🏹 Éclaireur" },
  { value: "ARCANISTE", label: "🔮 Arcaniste" },
  { value: "GARDIEN", label: "🛡️ Gardien" },
  { value: "PREDICATEUR", label: "📖 Prédicateur" },
];

export default function AventurierEdit({ id, onSuccess, onBack }) {
  const [form, setForm] = useState(null); // null = pas encore chargé
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  // Pré-remplissage avec les données existantes
  useEffect(() => {
    getAventurierById(id)
      .then((data) => {
        setForm({
          nom: data.nom,
          description: data.description || "",
          physique: data.physique,
          mental: data.mental,
          perception: data.perception,
          classe: data.classe,
        });
        setStatus("idle");
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setStatus("error");
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setStatus("loading");
      await updateAventurier(id, {
        ...form,
        physique: parseInt(form.physique),
        mental: parseInt(form.mental),
        perception: parseInt(form.perception),
      });
      setStatus("success");
      onSuccess();
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  }

  if (status === "loading" && !form) {
    return <div className="aventurier-create"><p>⏳ Chargement...</p></div>;
  }

  return (
    <div className="aventurier-create">
      <h2>✏️ Modifier l'aventurier</h2>

      {status === "error" && (
        <div className="alert alert-error">❌ {errorMessage}</div>
      )}

      <form
        className="create-form"
        onSubmit={handleSubmit}
        aria-label="Formulaire de modification d'aventurier"
      >
        <div className="form-group">
          <label htmlFor="nom">Nom *</label>
          <input
            id="nom"
            name="nom"
            type="text"
            value={form.nom}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="classe">Classe *</label>
          <select
            id="classe"
            name="classe"
            value={form.classe}
            onChange={handleChange}
            aria-required="true"
          >
            {CLASSES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-stats">
          <h3>Caractéristiques</h3>
          <div className="stats-grid">
            <div className="form-group">
              <label htmlFor="physique">⚔️ Physique (1-20)</label>
              <input
                id="physique"
                name="physique"
                type="number"
                min="1"
                max="20"
                value={form.physique}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mental">🧠 Mental (1-20)</label>
              <input
                id="mental"
                name="mental"
                type="number"
                min="1"
                max="20"
                value={form.mental}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="perception">👁️ Perception (1-20)</label>
              <input
                id="perception"
                name="perception"
                type="number"
                min="1"
                max="20"
                value={form.perception}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>
            ← Annuler
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading" ? "⏳ Sauvegarde..." : "✅ Sauvegarder"}
          </button>
        </div>
      </form>
    </div>
  );
}