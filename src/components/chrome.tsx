import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  CommandIcon, SearchIcon, ArrowUpIcon, ArrowUpRightIcon, CopyIcon, CheckIcon,
  GithubIcon, MailIcon, DiscordIcon, WhatsappIcon, MenuIcon, CloseIcon,
} from './icons';
import { useScrollProgress } from '../hooks';
import { PROJECTS, CONTACTS } from '../data';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/notes', label: 'Notes' },
  { to: '/uses', label: 'Uses' },
];

export function Navbar({ onPalette }: { onPalette: () => void }) {
  const progress = useScrollProgress();
  const loc = useLocation();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  return (
    <>
      <div className="anim-fade fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <header
          className={`mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-2xl border px-3 transition-all duration-300 sm:gap-3 sm:px-4 ${
            scrolled ? 'border-white/10 bg-black/70 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.9)] backdrop-blur-xl' : 'border-white/[0.07] bg-black/40 backdrop-blur-lg'
          }`}
        >
          <button
            onClick={() => {
              if (loc.pathname === '/') window.location.reload();
              else nav('/');
            }}
            className="flex items-center gap-2.5"
            aria-label="Back to landing"
          >
            <img src="/avatar.png" alt="Yuno" className="h-8 w-8 rounded-full border border-purple-500/40" />
            <span className="font-mono text-sm font-bold tracking-tight text-white">
              YUNO<span className="text-purple-400">_</span>
            </span>
          </button>
          <nav className="ml-2 hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-lg px-3 py-1.5 font-mono text-[13px] transition-colors ${
                  loc.pathname === l.to ? 'bg-purple-600/15 text-purple-300' : 'text-stone-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-purple-500/25 bg-purple-600/10 px-2.5 py-1 font-mono text-[11px] text-purple-300 lg:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" /> open for work
            </span>
            <button
              onClick={onPalette}
              className="hidden items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-xs text-stone-400 transition-colors hover:border-white/20 hover:text-white sm:flex"
            >
              <SearchIcon size={13} /> <kbd className="rounded border border-white/10 px-1 text-[10px]">⌘K</kbd>
            </button>
            <Link
              to="/"
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150)}
              className="hidden rounded-lg bg-purple-600 px-4 py-1.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-500 sm:block"
            >
              Hire me
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="rounded-lg border border-white/10 p-2 text-stone-300 md:hidden"
            >
              {open ? <CloseIcon size={16} /> : <MenuIcon size={16} />}
            </button>
          </div>
          <div className="absolute inset-x-4 bottom-0 h-px overflow-hidden rounded-full">
            <div className="h-full bg-purple-600 shadow-[0_0_12px_rgba(168,85,247,0.9)] transition-[width]" style={{ width: `${progress * 100}%` }} />
          </div>
        </header>
      </div>

      {open && (
        <div className="anim-fade fixed inset-0 z-30 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <nav className="anim-pop w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-stone-950 p-2" onClick={(e) => e.stopPropagation()}>
            {LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`anim-rise flex items-center justify-between rounded-xl px-4 py-3.5 font-mono text-lg ${
                  loc.pathname === l.to ? 'bg-purple-600/15 text-purple-300' : 'text-stone-300'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span>
                  <span className="mr-3 text-xs text-stone-600">0{i + 1}</span>
                  {l.label}
                </span>
                <ArrowUpRightIcon size={16} className="text-stone-600" />
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onPalette();
              }}
              className="mt-1 flex w-full items-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-mono text-sm text-stone-400"
            >
              <SearchIcon size={14} /> Search / commands…
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const nav = useNavigate();
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
  }, [q, nav]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-24 backdrop-blur-sm" onClick={onClose}>
      <div
        className="anim-pop w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-stone-950 shadow-[0_0_60px_-12px_rgba(168,85,247,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <CommandIcon size={15} className="text-purple-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a page, project, or action…"
            className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-stone-600"
          />
          {copied && <CheckIcon size={14} className="text-purple-400" />}
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 && <p className="px-3 py-6 text-center font-mono text-sm text-stone-500">No matches. Try "projects".</p>}
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                r.run();
                onClose();
              }}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-purple-600/10"
            >
              <span className="font-medium text-stone-200">{r.label}</span>
              <span className="truncate font-mono text-xs text-stone-500">{r.hint}</span>
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
    { icon: <GithubIcon size={14} />, short: 'GitHub', href: CONTACTS.github.href },
    { icon: <DiscordIcon size={14} />, short: 'Discord', href: CONTACTS.discord.href },
    { icon: <WhatsappIcon size={14} />, short: 'WhatsApp', href: CONTACTS.whatsapp.href },
    { icon: <MailIcon size={14} />, short: 'Email', href: `mailto:${CONTACTS.email}` },
  ];

  return (
    <footer className="border-t border-white/[0.07] bg-black">
      <div className="mx-auto max-w-6xl px-4 pb-6 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <img src="/avatar.png" alt="Yuno" className="h-12 w-12 rounded-2xl border border-purple-500/30" />
            <div>
              <p className="font-mono text-sm font-bold text-white">
                YUNO<span className="text-purple-400">_</span>
              </p>
              <p className="mt-0.5 text-xs text-stone-500">CEO of Strenox Foundation</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5 rounded-full border border-purple-500/25 bg-purple-600/10 px-3 py-1.5 font-mono text-xs text-purple-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" /> open for work
            </span>
            <Link
              to="/"
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150)}
              className="group inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-500"
            >
              Start a project
              <ArrowUpRightIcon size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-7 grid gap-6 border-t border-white/[0.07] pt-6 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600">Site</p>
            <div className="mt-2.5 flex gap-4 font-mono text-sm">
              {[
                ['/', 'Home'],
                ['/projects', 'Work'],
                ['/notes', 'Notes'],
                ['/uses', 'Uses'],
              ].map(([to, label]) => (
                <Link key={to} to={to} className="text-stone-400 transition-colors hover:text-purple-300">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600">Elsewhere</p>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm">
              {socials.map((s) => (
                <a key={s.short} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-1.5 text-stone-400 transition-colors hover:text-purple-300">
                  <span className="text-stone-600">{s.icon}</span>
                  {s.short}
                </a>
              ))}
            </div>
          </div>
          <div className="sm:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600">Contact</p>
            <button
              onClick={copyEmail}
              className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-stone-300 transition-colors hover:border-purple-500/50 hover:text-white"
            >
              {copied ? <CheckIcon size={13} className="text-purple-400" /> : <CopyIcon size={13} />}
              {copied ? 'copied!' : CONTACTS.email}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-xs text-stone-600">
          <span>© {new Date().getFullYear()} Arjan Subedi · Strenox Foundation · v3.5.3</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1 transition-colors hover:text-purple-300">
      <ArrowUpIcon size={13} /> top
    </button>
  );
}
