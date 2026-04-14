import { useState } from "react";
import { login } from "../services/authService";
import "./Login.css";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setStatus("loading");
      await login(form.username, form.password);
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
        <h2>⚔️ Fantasy World</h2>
        <p className="login-subtitle">Connectez-vous pour continuer</p>

        {status === "error" && (
          <div className="alert alert-error" role="alert">
            ❌ {errorMessage}
          </div>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
          aria-label="Formulaire de connexion"
        >
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
              aria-required="true"
              placeholder="admin"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              aria-required="true"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn-primary login-btn"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading" ? "⏳ Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="login-hint">
          💡 Comptes disponibles :<br/>
          <strong>admin</strong> / <strong>admin123</strong> → Tous les droits<br/>
          <strong>user</strong> / <strong>user123</strong> → Lecture seule
        </p>
      </div>
    </div>
  );
}