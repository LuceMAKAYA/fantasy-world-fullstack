import { useState } from "react";
import { register } from "../services/authService";
import "./Login.css"; // même style

export default function Register({ onSuccess, onBack }) {
  const [form, setForm] = useState({ username: "", password: "", role: "USER" });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
    try {
      setStatus("loading");
      await register(form.username, form.password, form.role);
      setStatus("success");
      onSuccess();
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>⚔️ Créer un compte</h2>
        <p className="login-subtitle">Rejoignez Fantasy World</p>

        {status === "error" && (
          <div className="alert alert-error" role="alert">❌ {errorMessage}</div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username" name="username" type="text"
              value={form.username} onChange={handleChange}
              required minLength={3} placeholder="Votre pseudo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password" name="password" type="password"
              value={form.password} onChange={handleChange}
              required minLength={6} placeholder="Minimum 6 caractères"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Rôle</label>
            <select id="role" name="role" value={form.role} onChange={handleChange}>
              <option value="USER">👁️ Viewer — Lecture seule</option>
              <option value="ADMIN">⚔️ Admin — Tous les droits</option>
            </select>
          </div>
          <button type="submit" className="btn-primary login-btn"
            disabled={status === "loading"}>
            {status === "loading" ? "⏳ Création..." : "Créer mon compte"}
          </button>
        </form>

        <p className="login-switch">
          Déjà un compte ?{" "}
          <button className="btn-link" onClick={onBack}>Se connecter</button>
        </p>
      </div>
    </div>
  );
}