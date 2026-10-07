import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Command, Moon, Sun, Search, ArrowUp, Copy, Check } from 'lucide-react';
import { useTheme } from '../theme';
import { useKathmanduTime, useScrollProgress } from '../hooks';
import { PROJECTS, CONTACTS } from '../data';

export function Navbar({ onPalette }: { onPalette: () => void }) {
  const { theme, toggle } = useTheme();
  const time = useKathmanduTime();
  const progress = useScrollProgress();
  const loc = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Work' },
    { to: '/notes', label: 'Notes' },
    { to: '/uses', label: 'Uses' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-900/10 bg-paper/90 backdrop-blur dark:border-white/10 dark:bg-[#0C0A09]/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-lime-600" />
          YUNO
          <span className="hidden rounded-full border border-stone-900/15 px-2 py-0.5 text-[11px] font-normal text-stone-500 sm:inline dark:border-white/15 dark:text-stone-400">
            KTM {time}
          </span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                loc.pathname === l.to
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
                  : 'text-stone-600 hover:bg-stone-900/5 dark:text-stone-300 dark:hover:bg-white/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-lime-600/10 px-2.5 py-1 text-xs font-medium text-lime-700 lg:flex dark:text-lime-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-600" /> open for work
          </span>
          <button
            onClick={onPalette}
            className="flex items-center gap-1.5 rounded-full border border-stone-900/15 px-3 py-1.5 font-mono text-xs text-stone-500 transition-colors hover:bg-stone-900/5 dark:border-white/15 dark:text-stone-400 dark:hover:bg-white/10"
          >
            <Search size={13} /> <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-stone-900/15 px-1 text-[10px] sm:inline dark:border-white/15">⌘K</kbd>
          </button>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full border border-stone-900/15 p-2 text-stone-600 transition-colors hover:bg-stone-900/5 dark:border-white/15 dark:text-stone-300 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
      <div className="h-0.5 bg-lime-600 transition-[width]" style={{ width: `${progress * 100}%` }} />
      <nav className="flex gap-1 overflow-x-auto border-t border-stone-900/5 px-4 py-2 md:hidden dark:border-white/5">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${
              loc.pathname === l.to ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'text-stone-600 dark:text-stone-300'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const { toggle } = useTheme();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setQ('');
  }, [open ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open ? onClose() : document.getElementById('palette-trigger')?.click();
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const query = q.toLowerCase().trim();
    const pages = [
      { label: 'Go to Home', hint: 'page', run: () => nav('/') },
      { label: 'Go to Work / Projects', hint: 'page', run: () => nav('/projects') },
      { label: 'Go to Notes', hint: 'page', run: () => nav('/notes') },
      { label: 'Go to Uses', hint: 'page', run: () => nav('/uses') },
      { label: 'Toggle light / dark', hint: 'theme', run: toggle },
      {
        label: 'Copy email address',
        hint: CONTACTS.email,
        run: () => {
          navigator.clipboard?.writeText(CONTACTS.email).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        },
      },
    ];
    const projs = PROJECTS.map((p) => ({
      label: `Project: ${p.title}`,
      hint: p.stack.join(' · '),
      run: () => nav(`/projects?find=${p.slug}`),
    }));
    const all = [...pages, ...projs];
    if (!query) return all.slice(0, 7);
    return all.filter((r) => r.label.toLowerCase().includes(query) || r.hint.toLowerCase().includes(query)).slice(0, 8);
  }, [q, nav, toggle]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-24" onClick={onClose}>
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-stone-900/10 bg-white shadow-2xl dark:border-white/10 dark:bg-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-stone-900/10 px-4 py-3 dark:border-white/10">
          <Command size={15} className="text-stone-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a page, project, or action…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
          />
          {copied && <Check size={14} className="text-lime-600" />}
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-stone-500">No matches. Try "projects".</p>}
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                r.run();
                onClose();
              }}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-stone-900/5 dark:hover:bg-white/10"
            >
              <span className="font-medium">{r.label}</span>
              <span className="truncate font-mono text-xs text-stone-400">{r.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const [copied, setCopied] = useState(false);
  return (
    <footer className="border-t border-stone-900/10 dark:border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-mono text-sm font-semibold">YUNO — developer & AI builder</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            Game panels, Minecraft plugins, Discord bots and web platforms. Designed in Kathmandu, running everywhere.
          </p>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(CONTACTS.email).catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className="mt-4 flex items-center gap-2 rounded-full border border-stone-900/15 px-3 py-1.5 font-mono text-xs transition-colors hover:bg-stone-900/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            {copied ? <Check size={13} className="text-lime-600" /> : <Copy size={13} />}
            {copied ? 'copied!' : CONTACTS.email}
          </button>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-stone-400">Site</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link className="hover:underline" to="/">Home</Link>
            <Link className="hover:underline" to="/projects">Work</Link>
            <Link className="hover:underline" to="/notes">Notes</Link>
            <Link className="hover:underline" to="/uses">Uses</Link>
          </div>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-stone-400">Elsewhere</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a className="hover:underline" href={CONTACTS.github.href} target="_blank" rel="noreferrer">GitHub — {CONTACTS.github.label}</a>
            <a className="hover:underline" href={CONTACTS.discord.href} target="_blank" rel="noreferrer">Discord — {CONTACTS.discord.label}</a>
            <a className="hover:underline" href={CONTACTS.whatsapp.href} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="hover:underline" href={`mailto:${CONTACTS.email}`}>Email</a>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-900/10 py-4 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 font-mono text-xs text-stone-400">
          <span>© {new Date().getFullYear()} Yuno · v2.0 fresh revamp</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1 hover:text-stone-700 dark:hover:text-stone-200">
      <ArrowUp size={13} /> top
    </button>
  );
}
