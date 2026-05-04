import { useState, useEffect, useRef } from "react";
import { isAuthenticated, logout, getUsername, getRole } from "./services/authService";
import AventuriersList from "./pages/AventuriersList";
import AventurierDetail from "./pages/AventurierDetail";
import AventurierCreate from "./pages/AventurierCreate";
import AventurierEdit from "./pages/AventurierEdit";
import CompetencesList from "./pages/CompetencesList";
import CompetenceDetail from "./pages/CompetenceDetail";
import CompetenceCreate from "./pages/CompetenceCreate";
import CompetenceEdit from "./pages/CompetenceEdit";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";
import "./index.css";
import "./styles/app.css";

function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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

  const navigateTo = (pageName, id = null) => {
    if (pageName === "create" && role !== "ROLE_ADMIN") {
      setPage("forbidden");
      return;
    }
    setPage(pageName);
    setSelectedId(id);
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

  if (!authenticated) {
    return (
      <div className="app">
        <ParticlesBackground />
        <header className="app-header" role="banner">
          <h1>⚔ FANTASY <span>WORLD</span></h1>
        </header>
        <main className="app-main" role="main">
          <Login onSuccess={handleLoginSuccess} />
        </main>
        <footer className="app-footer" role="contentinfo">
          <p>⚔ Fantasy World — Full Stack Project</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <ParticlesBackground />
      <header className="app-header" role="banner">
        <h1>⚔ FANTASY <span>WORLD</span></h1>
        <nav role="navigation" aria-label="Navigation principale">
          <span className="username">⚜ {getUsername()}</span>

          <button className="btn-secondary" onClick={() => navigateTo("competences")}>
  Compétences
</button>
          <button
            className="btn-secondary"
            onClick={() => navigateTo("list")}
            aria-current={page === "list" ? "page" : undefined}
          >
            Roster
          </button>
          {role === "ROLE_ADMIN" && (
            <button
              className="btn-primary"
              onClick={() => navigateTo("create")}
              aria-current={page === "create" ? "page" : undefined}
            >
              + Recruit
            </button>
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

<main className="app-main" role="main">
  {page === "competences" && (
    <CompetencesList
      onSelect={(id) => navigateTo("competenceDetail", id)}
      onCreateClick={() => navigateTo("competenceCreate")}
      canCreate={role === "ROLE_ADMIN"}
    />
  )}
  {page === "competenceCreate" && role === "ROLE_ADMIN" && (
    <CompetenceCreate
      onSuccess={() => navigateTo("competences")}
      onBack={() => navigateTo("competences")}
    />
  )}
  {page === "competenceDetail" && (
    <CompetenceDetail
      id={selectedId}
      onBack={() => navigateTo("competences")}
      onEdit={() => navigateTo("competenceEdit", selectedId)}
      canEdit={role === "ROLE_ADMIN"}
    />
  )}
  {page === "competenceEdit" && role === "ROLE_ADMIN" && (
    <CompetenceEdit
      id={selectedId}
      onSuccess={() => navigateTo("competences")}
      onBack={() => navigateTo("competenceDetail", selectedId)}
    />
  )}

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
    <AventurierCreate
      onSuccess={() => navigateTo("list")}
      onBack={() => navigateTo("list")}
    />
  )}
  {page === "edit" && role === "ROLE_ADMIN" && (
    <AventurierEdit
      id={selectedId}
      onSuccess={() => navigateTo("list")}
      onBack={() => navigateTo("detail", selectedId)}
    />
  )}
  {page === "forbidden" && (
    <AccessDenied onBack={() => navigateTo("list")} />
  )}
</main>

      <footer className="app-footer" role="contentinfo">
        <p>⚔ Fantasy World — Full Stack Project</p>
      </footer>
    </div>
  );
}