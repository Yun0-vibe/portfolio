import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Command, Moon, Sun, Search, ArrowUp, ArrowUpRight, Copy, Check, Github, Mail, MessageCircle, Phone } from 'lucide-react';
import { useTheme } from '../theme';
import { useScrollProgress } from '../hooks';
import { PROJECTS, CONTACTS } from '../data';

export function Navbar({ onPalette }: { onPalette: () => void }) {
  const { theme, toggle } = useTheme();
  const progress = useScrollProgress();
  const loc = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Work' },
    { to: '/notes', label: 'Notes' },
    { to: '/uses', label: 'Uses' },
  ];

  return (
    <header className="anim-fade sticky top-0 z-40 border-b border-stone-900/10 bg-paper/90 backdrop-blur dark:border-white/10 dark:bg-[#0C0A09]/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-lime-600" />
          YUNO
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
        className="anim-pop w-full max-w-lg overflow-hidden rounded-2xl border border-stone-900/10 bg-white shadow-2xl dark:border-white/10 dark:bg-stone-900"
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
  const copyEmail = () => {
    navigator.clipboard?.writeText(CONTACTS.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const socials = [
    { icon: <Github size={14} />, label: `GitHub — ${CONTACTS.github.label}`, short: 'GitHub', href: CONTACTS.github.href },
    { icon: <MessageCircle size={14} />, label: `Discord — ${CONTACTS.discord.label}`, short: 'Discord', href: CONTACTS.discord.href },
    { icon: <Phone size={14} />, label: 'WhatsApp — chat', short: 'WhatsApp', href: CONTACTS.whatsapp.href },
    { icon: <Mail size={14} />, label: CONTACTS.email, short: 'Email', href: `mailto:${CONTACTS.email}` },
  ];

  return (
    <footer className="bg-stone-950 text-stone-200 dark:border-t dark:border-white/10 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 pb-6 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <p className="font-display text-4xl italic leading-none tracking-tight text-white md:text-5xl">
              Yuno<span className="text-lime-500">.</span>
            </p>
            <p className="hidden max-w-xs text-xs leading-relaxed text-stone-400 sm:block">
              CEO of Strenox Foundation — plugins, panels, bots and web.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5 rounded-full bg-lime-500/10 px-3 py-1.5 font-mono text-xs text-lime-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-500" /> open for work
            </span>
            <Link
              to="/"
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150)}
              className="group inline-flex items-center gap-1.5 rounded-full bg-lime-600 px-5 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-lime-500"
            >
              Start a project
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-7 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500">Site</p>
            <div className="mt-2.5 flex gap-4 text-sm">
              {[
                ['/', 'Home'],
                ['/projects', 'Work'],
                ['/notes', 'Notes'],
                ['/uses', 'Uses'],
              ].map(([to, label]) => (
                <Link key={to} to={to} className="text-stone-300 transition-colors hover:text-lime-400">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500">Elsewhere</p>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-1.5 text-stone-300 transition-colors hover:text-lime-400">
                  <span className="text-stone-500">{s.icon}</span>
                  {s.short}
                </a>
              ))}
            </div>
          </div>
          <div className="sm:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500">Contact</p>
            <button
              onClick={copyEmail}
              className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-stone-300 transition-colors hover:border-lime-500/50 hover:text-white"
            >
              {copied ? <Check size={13} className="text-lime-400" /> : <Copy size={13} />}
              {copied ? 'copied!' : CONTACTS.email}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-stone-500">
          <span>© {new Date().getFullYear()} Yuno</span>
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
