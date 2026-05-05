import React from 'react';
import './Header.css';

const Header = ({ getUsername, isAdmin, navigateTo, handleLogout, page }) => {
  return (
    <header className="app-header" role="banner">
      <h1>⚔ FANTASY <span>WORLD</span></h1>
      
      <nav role="navigation" aria-label="Navigation principale">
        <span className="username">⚜ {getUsername()}</span>
        
        <button
          className="btn-secondary"
          onClick={() => navigateTo("list")}
          aria-current={page === "list" ? "page" : undefined}
        >
          Roster
        </button>

        {isAdmin() && (
          <>
            <button
              className="btn-primary"
              onClick={() => navigateTo("create")}
              aria-current={page === "create" ? "page" : undefined}
            >
              + Recruit
            </button>
            
            {/* Bouton Compétence */}
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