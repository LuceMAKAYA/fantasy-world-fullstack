import React from 'react';
import './Header.css';

const Header = ({ getUsername, role, navigateTo, handleLogout, page }) => {
  return (
    <header className="app-header" role="banner">
      <h1>⚔ FANTASY <span>WORLD</span></h1>
      
      <nav role="navigation" aria-label="Navigation principale">
        {/* Affichage du pseudo via la fonction passée en prop */}
        <span className="username">⚜ {getUsername()}</span>
        
        {/* Bouton Roster accessible à tous */}
        <button
          className="btn-secondary"
          onClick={() => navigateTo("list")}
          aria-current={page === "list" ? "page" : undefined}
        >
          Roster
        </button>

        {/* Section réservée aux ADMINS */}
        {role === "ROLE_ADMIN" && (
          <>
            <button
              className="btn-primary"
              onClick={() => navigateTo("create")}
              aria-current={page === "create" ? "page" : undefined}
            >
              + Recruit
            </button>
            
            <button
              className="btn-primary"
              onClick={() => navigateTo("competence-create")}
              aria-current={page === "competence-create" ? "page" : undefined}
              style={{ marginLeft: "8px" }}
            >
              📜 Grimoire
            </button>
          </>
        )}

        {/* Bouton Déconnexion */}
        <button
          className="btn-danger"
          onClick={handleLogout}
          aria-label="Se déconnecter"
        >
          ⎋ Leave
        </button>
      </nav>
    </header>
  );
};

export default Header;