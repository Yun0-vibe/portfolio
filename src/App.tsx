import { useEffect, useState, lazy, Suspense, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, CommandPalette, Footer } from './components/chrome';
import { BootLoader } from './components/loader';
import { ProjectModal } from './components/projects';
import { HomePage } from './pages/home';
import type { Project } from './data';

const ProjectsPage = lazy(() => import('./pages/projects').then((m) => ({ default: m.ProjectsPage })));
const NotesPage = lazy(() => import('./pages/notes').then((m) => ({ default: m.NotesPage })));
const UsesPage = lazy(() => import('./pages/uses').then((m) => ({ default: m.UsesPage })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-4 h-4 w-full max-w-md animate-pulse rounded bg-white/10" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl bg-white/10" />
        ))}
      </div>
    </div>
  );
}

function Shell() {
  const [palette, setPalette] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  const [boot, setBoot] = useState(() => !sessionStorage.getItem('yuno-boot'));
  const finishBoot = useCallback(() => {
    sessionStorage.setItem('yuno-boot', '1');
    setBoot(false);
  }, []);
  const { pathname } = useLocation();

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
    <div className="flex min-h-screen flex-col">
      {boot && <BootLoader done={finishBoot} />}
      <Navbar onPalette={() => setPalette(true)} />
      <ScrollToTop />
      <div key={pathname} className="anim-page flex-1">
      <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage onPick={setActive} />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/uses" element={<UsesPage />} />
        <Route path="*" element={<HomePage onPick={setActive} />} />
      </Routes>
      </Suspense>
      </div>
      <Footer />
      <span id="palette-slot" />
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
      <ProjectModal p={active} onClose={() => setActive(null)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
