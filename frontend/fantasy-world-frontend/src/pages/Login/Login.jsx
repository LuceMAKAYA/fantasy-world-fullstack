import { useState } from "react";
import { login } from "../../services/authService";
import Register from "./Register";
import "./Login.css";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return <Register onSuccess={onSuccess} onBack={() => setShowRegister(false)} />;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
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
          <div className="alert alert-error" role="alert">❌ {errorMessage}</div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username" name="username" type="text"
              value={form.username} onChange={handleChange}
              required autoComplete="username" placeholder="Votre pseudo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password" name="password" type="password"
              value={form.password} onChange={handleChange}
              required autoComplete="current-password" placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary login-btn"
            disabled={status === "loading"}>
            {status === "loading" ? "⏳ Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="login-switch">
          Pas encore de compte ?{" "}
          <button className="btn-link" onClick={() => setShowRegister(true)}>
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
}