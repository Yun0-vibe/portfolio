import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { Navbar, CommandPalette, Footer } from './components/chrome';
import { ProjectModal } from './components/projects';
import { HomePage } from './pages/home';
import { ProjectsPage } from './pages/projects';
import { NotesPage } from './pages/notes';
import { UsesPage } from './pages/uses';
import type { Project } from './data';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  const [palette, setPalette] = useState(false);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const btn = document.createElement('button');
    btn.id = 'palette-trigger';
    btn.style.display = 'none';
    btn.onclick = () => setPalette(true);
    document.body.appendChild(btn);
    return () => {
      btn.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar onPalette={() => setPalette(true)} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage onPick={setActive} />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/uses" element={<UsesPage />} />
        <Route path="*" element={<HomePage onPick={setActive} />} />
      </Routes>
      <Footer />
      <span id="palette-slot" />
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
      <ProjectModal p={active} onClose={() => setActive(null)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
