import { useState, useEffect, useRef } from "react";
import { isAuthenticated, logout, getUsername, getRole } from "./services/authService";
import AventurierEdit from "./pages/AventurierEdit";
import AventuriersList from "./pages/AventurierList/AventuriersList";
import AventurierDetail from "./pages/AventurierDetail/AventurierDetail";
import AventurierCreate from "./pages/AventurierCreate/AventurierCreate";
import CompetenceCreate from "./pages/CompetenceCreate/CompetenceCreate";
import Login from "./pages/Login/Login";
import AccessDenied from "./pages/AccessDenied/AccessDenied";
import "./index.css";
import "./styles/app.css";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";

// RÉINTÉGRATION DE LA FONCTION POUR ÉVITER LA REFERENCEERROR
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

  const navigateTo = (pageName, id = null) => {
    if (pageName === "create" && role !== "ROLE_ADMIN") {
      // Mise à jour de la sécurité pour inclure la page de compétence
      const protectedPages = ["create", "competence-create"];
      if (protectedPages.includes(pageName) && !isAdmin()) {
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
        <Header
          getUsername={getUsername} // <-- Vérifie que cette ligne existe bien !
          isAdmin={isAdmin}
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
          {/* Rendu de la page compétence rajouté */}
          {page === "competence-create" && isAdmin() && (
            <CompetenceCreate onSuccess={() => navigateTo("list")} />
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
}