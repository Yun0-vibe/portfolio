import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  CommandIcon, SearchIcon, ArrowUpIcon, ArrowUpRightIcon, CopyIcon, CheckIcon,
  GithubIcon, MailIcon, DiscordIcon, WhatsappIcon, MenuIcon, CloseIcon,
} from './icons';
import { useScrollProgress } from '../hooks';
import { PROJECTS, CONTACTS } from '../data';
import { VERSION } from '../version';

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
          className={`mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-full border px-4 transition-all duration-300 sm:gap-4 ${
            scrolled ? 'border-white/10 bg-black/80 backdrop-blur-xl' : 'border-white/[0.06] bg-black/40 backdrop-blur-lg'
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
            <img src="/avatar.png" alt="Yuno" className="h-7 w-7 rounded-full border border-purple-500/30" />
            <span className="text-sm font-semibold tracking-tight text-white">Yuno</span>
          </button>
          <nav className="ml-2 hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  loc.pathname === l.to ? 'text-purple-300' : 'text-stone-500 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-2 text-xs text-stone-500 lg:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" /> available for work
            </span>
            <button
              onClick={onPalette}
              className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-stone-500 transition-colors hover:border-white/25 hover:text-white"
            >
              <SearchIcon size={13} />
              <kbd className="hidden text-[10px] sm:inline">⌘K</kbd>
            </button>
            <Link
              to="/"
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150)}
              className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-purple-200 sm:block"
            >
              Hire me
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="rounded-full border border-white/10 p-2 text-stone-300 md:hidden"
            >
              {open ? <CloseIcon size={15} /> : <MenuIcon size={15} />}
            </button>
          </div>
          <div className="absolute inset-x-6 bottom-0 h-px overflow-hidden">
            <div className="h-full bg-purple-500/80 transition-[width]" style={{ width: `${progress * 100}%` }} />
          </div>
        </header>
      </div>

      {open && (
        <div className="anim-fade fixed inset-0 z-30 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <nav className="anim-pop w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0a0813] p-2" onClick={(e) => e.stopPropagation()}>
            {LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`anim-rise flex items-center justify-between rounded-xl px-4 py-3.5 text-lg ${
                  loc.pathname === l.to ? 'text-purple-300' : 'text-stone-300'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span>{l.label}</span>
                <ArrowUpRightIcon size={15} className="text-stone-700" />
              </Link>
            ))}
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
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 p-4 pt-24 backdrop-blur-sm" onClick={onClose}>
      <div
        className="anim-pop w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0813]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <CommandIcon size={15} className="text-purple-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages, projects, actions…"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-stone-600"
          />
          {copied && <CheckIcon size={14} className="text-purple-400" />}
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
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5"
            >
              <span className="text-stone-200">{r.label}</span>
              <span className="truncate text-xs text-stone-600">{r.hint}</span>
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
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-4xl italic leading-none text-white">
              Yuno<span className="text-purple-400">.</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-500">
              Paid Minecraft server and plugin developer, full-stack web engineer. Manager of YetiMC, CEO of StrenoxCloud.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-600">Site</p>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                {[
                  ['/', 'Home'],
                  ['/projects', 'Work'],
                  ['/notes', 'Notes'],
                  ['/uses', 'Uses'],
                ].map(([to, label]) => (
                  <Link key={to} to={to} className="w-fit text-stone-400 transition-colors hover:text-purple-300">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-600">Elsewhere</p>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                {socials.map((s) => (
                  <a key={s.short} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex w-fit items-center gap-2 text-stone-400 transition-colors hover:text-purple-300">
                    <span className="text-stone-600">{s.icon}</span>
                    {s.short}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-600">Contact</p>
              <button
                onClick={copyEmail}
                className="mt-4 inline-flex items-center gap-2 border-b border-white/15 pb-1 text-sm text-stone-300 transition-colors hover:border-purple-400 hover:text-white"
              >
                {copied ? <CheckIcon size={13} className="text-purple-400" /> : <CopyIcon size={13} />}
                {copied ? 'copied' : CONTACTS.email}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-stone-600">
          <span>© {new Date().getFullYear()} Yuno · v{VERSION}</span>
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
