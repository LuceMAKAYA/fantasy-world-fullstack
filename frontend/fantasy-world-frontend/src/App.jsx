import { useState, useEffect, useRef } from "react";
import { isAuthenticated, logout, getUsername, getRole } from "./services/authService";
import AventurierEdit from "./pages/AventurierEdit";
import AventuriersList from "./pages/AventurierList/AventuriersList";
import AventurierDetail from "./pages/AventurierDetail/AventurierDetail";
import AventurierCreate from "./pages/AventurierCreate/AventurierCreate";
import CompetenceCreate from "./pages/CompetenceCreate/CompetenceCreate";
import CompetencesList from "./pages/CompetencesList/CompetencesList";
import Login from "./pages/Login/Login";
import AccessDenied from "./pages/AccessDenied/AccessDenied";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import "./index.css";
import "./styles/app.css";

function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.1,
      alpha: Math.random() * 0.35 + 0.08,
      color: Math.random() > 0.5 ? '212,175,55' : '124,58,237'
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-particles" />;
}

export default function App() {
  const [page, setPage] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [role, setRole] = useState(getRole());

  // Correction de la fonction navigateTo
  const navigateTo = (pageName, id = null) => {
    const protectedPages = ["create", "competence-create", "edit"];
    
    if (protectedPages.includes(pageName) && role !== "ROLE_ADMIN") {
      setPage("forbidden");
    } else {
      setPage(pageName);
      setSelectedId(id);
    }
  };

  function handleLogout() {
    logout();
    setAuthenticated(false);
    setRole(null);
    setPage("list");
  }

  function handleLoginSuccess() {
    setAuthenticated(true);
    setRole(getRole());
    setPage("list");
  }

  // Écran de connexion
  if (!authenticated) {
    return (
      <div className="app">
        <ParticlesBackground />
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

  // Application principale (Authentifiée)
  return (
    <div className="app">
      <ParticlesBackground />
      
      {/* Utilisation du composant Header unique */}
      <Header
        getUsername={getUsername}
        role={role} // On passe le role au lieu de isAdmin
        navigateTo={navigateTo}
        handleLogout={handleLogout}
        page={page}
      />

      <main className="app-main" role="main">
        {page === "list" && (
          <AventuriersList
            onSelect={(id) => navigateTo("detail", id)}
            canDelete={role === "ROLE_ADMIN"}
          />
        )}
        {page === "detail" && (
          <AventurierDetail
            id={selectedId}
            onBack={() => navigateTo("list")}
            onEdit={role === "ROLE_ADMIN" ? () => navigateTo("edit", selectedId) : undefined}
          />
        )}
        {page === "create" && role === "ROLE_ADMIN" && (
          <AventurierCreate onSuccess={() => navigateTo("list")} />
        )}
        {page === "competence-create" && role === "ROLE_ADMIN" && (
          <CompetenceCreate onSuccess={() => navigateTo("list")} />
        )}
        {page === "competences" && (
  <CompetencesList
    onSelect={(id) => navigateTo("competence-detail", id)}
    canCreate={role === "ROLE_ADMIN"}
    onCreate={() => navigateTo("competence-create")}
  />
)}
        
        {page === "forbidden" && (
          <AccessDenied onBack={() => navigateTo("list")} />
        )}
        {page === "edit" && role === "ROLE_ADMIN" && (
          <AventurierEdit
            id={selectedId}
            onSuccess={() => navigateTo("list")}
            onBack={() => navigateTo("detail", selectedId)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}