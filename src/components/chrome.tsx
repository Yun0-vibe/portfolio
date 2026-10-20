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
      <div className="anim-fade fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 sm:pt-5">
        <header
          className={`mx-auto flex h-14 max-w-6xl items-center gap-5 rounded-2xl border px-4 transition-all duration-300 sm:px-5 ${
            scrolled
              ? 'border-white/12 bg-[#08070d]/85 shadow-[0_20px_60px_-30px_rgba(0,0,0,1)] backdrop-blur-xl'
              : 'border-white/[0.07] bg-[#08070d]/40 backdrop-blur-md'
          }`}
        >
          <button
            onClick={() => {
              if (loc.pathname === '/') window.location.reload();
              else nav('/');
            }}
            className="group flex items-center gap-2.5"
            aria-label="Back to landing"
          >
            <img
              src="/avatar.png"
              alt="Yuno"
              className="h-7 w-7 rounded-full border border-white/15 transition-transform duration-300 group-hover:scale-105 group-hover:border-violet-400/60"
            />
            <span className="text-sm font-medium tracking-tight text-white">Yuno</span>
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 ${
                  loc.pathname === l.to
                    ? 'bg-violet-500/15 text-violet-200'
                    : 'text-stone-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 lg:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="label">Available for work</span>
            </span>
            <button
              onClick={onPalette}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-stone-600 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              aria-label="Open search"
            >
              <SearchIcon size={14} />
              <kbd className="hidden text-[10px] sm:inline">⌘K</kbd>
            </button>
            <Link
              to="/"
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150)}
              className="hidden rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-400 hover:shadow-[0_0_30px_-6px_rgba(167,139,250,0.8)] sm:block"
            >
              Hire me
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="rounded-lg p-2 text-stone-300 transition-colors hover:bg-white/5 md:hidden"
            >
              {open ? <CloseIcon size={17} /> : <MenuIcon size={17} />}
            </button>
          </div>
          <div className="absolute inset-x-6 bottom-0 h-px overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-[width]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </header>
      </div>

      {open && (
        <div className="anim-fade fixed inset-0 z-30 flex items-center justify-center bg-[#08070d]/95 px-6 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <nav className="anim-pop w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
            {LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`anim-rise rule block py-5 text-3xl font-medium tracking-[-0.03em] transition-colors ${
                  loc.pathname === l.to ? 'text-violet-300' : 'text-stone-400'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {l.label}
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
        className="anim-pop w-full max-w-lg overflow-hidden border border-white/12 bg-[#0d0b16]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <CommandIcon size={15} className="text-stone-300" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages, projects, actions…"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-stone-600"
          />
          {copied && <CheckIcon size={14} className="text-stone-300" />}
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
    <footer className="rule-b">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl italic text-white">
              Yuno<span className="text-violet-400">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-600">
              Paid Minecraft server and plugin developer. Full-stack web engineer.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="label">Site</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {[
                ['/', 'Home'],
                ['/projects', 'Work'],
                ['/notes', 'Notes'],
                ['/uses', 'Setup'],
              ].map(([to, label]) => (
                <Link key={to} to={to} className="link w-fit text-stone-500 transition-colors hover:text-violet-300">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="label">Elsewhere</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {socials.map((s) => (
                <a key={s.short} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="link flex w-fit items-center gap-2 text-stone-500 transition-colors hover:text-violet-300">
                  <span className="text-stone-700">{s.icon}</span>
                  {s.short}
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="label">Contact</p>
            <button
              onClick={copyEmail}
              className="link mt-4 inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-violet-300"
            >
              {copied ? <CheckIcon size={13} className="text-emerald-400" /> : <CopyIcon size={13} />}
              {copied ? 'copied' : 'Copy email'}
            </button>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-5 font-meta text-[11px] text-stone-700">
          <span>© {new Date().getFullYear()} Yuno · v{VERSION}</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1 transition-colors hover:text-white">
      <ArrowUpIcon size={13} /> top
    </button>
  );
}
