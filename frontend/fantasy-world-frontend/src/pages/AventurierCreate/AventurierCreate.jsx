import { useState } from "react";
import { createAventurier } from "../../services/aventurierService";
import "./AventurierCreate.css";

const CLASSES = [
  { value: "MAITRE_D_ARMES", label: "⚔️ Maître d'armes" },
  { value: "ECLAIREUR", label: "🏹 Éclaireur" },
  { value: "ARCANISTE", label: "🔮 Arcaniste" },
  { value: "GARDIEN", label: "🛡️ Gardien" },
  { value: "PREDICATEUR", label: "📖 Prédicateur" },
];

export default function AventurierCreate({ onSuccess }) {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    physique: 10,
    mental: 10,
    perception: 10,
    classe: "MAITRE_D_ARMES",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setStatus("loading");
      await createAventurier({
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

  return (
    <div className="aventurier-create">
      <h2>⚔️ Nouvel Aventurier</h2>

      {status === "error" && (
        <div className="alert alert-error">❌ {errorMessage}</div>
      )}

      <form
        className="create-form"
        onSubmit={handleSubmit}
        aria-label="Formulaire de création d'aventurier"
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
            placeholder="Ex: Adhakhan du clan de la Chope Fumante"
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
            placeholder="Décrivez votre aventurier..."
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
                aria-required="true"
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
                aria-required="true"
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
                aria-required="true"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading" ? "⏳ Création..." : "✅ Créer l'aventurier"}
          </button>
        </div>
      </form>
    </div>
  );
}