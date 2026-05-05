import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

const Header = ({ getUsername, role, handleLogout }) => {
  return (
    <header className="app-header" role="banner">
      {/* Le logo utilise Link car on n'a pas besoin de style "actif" dessus */}
      <Link to="/" className="header-logo">
        <h1>⚔ FANTASY <span>WORLD</span></h1>
      </Link>
      
      <nav role="navigation" aria-label="Navigation principale">
        <span className="username">⚜ {getUsername()}</span>
        
        {/* NavLink ajoute automatiquement la classe .active quand l'URL correspond */}
        <NavLink 
          to="/aventuriers" 
          className={({ isActive }) => isActive ? "btn-secondary active" : "btn-secondary"}
        >
          Roster
        </NavLink>

        <NavLink 
          to="/competences" 
          className={({ isActive }) => isActive ? "btn-secondary active" : "btn-secondary"}
        >
          ✨ Compétences
        </NavLink>

        {role === "ROLE_ADMIN" && (
          <>
            <NavLink 
              to="/aventuriers/create" 
              className={({ isActive }) => isActive ? "btn-primary active" : "btn-primary"}
            >
              + Recruit
            </NavLink>
            
            <NavLink 
              to="/competences/create" 
              className={({ isActive }) => isActive ? "btn-primary active" : "btn-primary"}
              style={{ marginLeft: "8px" }}
            >
              📜 Grimoire
            </NavLink>
          </>
        )}

        <button
          className="btn-danger"
          onClick={handleLogout}
          style={{ marginLeft: "15px" }}
        >
          ⎋ Leave
        </button>
      </nav>
    </header>
  );
};

export default Header;