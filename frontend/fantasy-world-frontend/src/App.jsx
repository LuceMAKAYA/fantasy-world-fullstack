import { useState } from "react";
import { isAuthenticated, logout, getUsername, getRole } from "./services/authService";
import AppRouter from "./router/router";
import Login from "./pages/Login/Login";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import "./index.css";
import "./styles/app.css";

export default function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [role, setRole] = useState(getRole());

  function handleLogout() {
    logout();
    setAuthenticated(false);
    setRole(null);
  }

  function handleLoginSuccess() {
    setAuthenticated(true);
    setRole(getRole());
  }

  // Écran de connexion
  if (!authenticated) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>⚔ FANTASY <span>WORLD</span></h1>
        </header>
        <main className="app-main">
          <Login onSuccess={handleLoginSuccess} />
        </main>
        <Footer />
      </div>
    );
  }

  // Application principale
  return (
    <div className="app">
      <Header
        getUsername={getUsername}
        role={role} 
        handleLogout={handleLogout}
      />

      <main className="app-main" role="main">
        <AppRouter role={role} />
      </main>

      <Footer />
    </div>
  );
}