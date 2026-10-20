import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon, SearchIcon, TerminalIcon } from './icons';
import { PROJECTS, type Project } from '../data';

const FILTERS = ['All', 'Web', 'Plugin', 'Security', 'Infra', 'Bot', 'Store'] as const;

export function ProjectFilters({ onPick }: { onPick: (p: Project) => void }) {
  const [params, setParams] = useSearchParams();
  const [cat, setCat] = useState<string>(params.get('cat') || 'All');
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');

  const list = useMemo(() => {
    const query = q.toLowerCase();
    return PROJECTS.filter((p) => {
      if (cat !== 'All' && p.category !== cat) return false;
      if (status !== 'All' && p.status !== status) return false;
      if (query && !(p.title + p.tagline + p.description + p.stack.join(' ')).toLowerCase().includes(query)) return false;
      return true;
    });
  }, [cat, q, status]);

  const highlight = params.get('find');

  return (
    <div>
      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-3 border-b border-white/15 pb-3 text-sm">
          <SearchIcon size={15} className="shrink-0 text-stone-600" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects, stacks, ideas…"
            className="w-full bg-transparent text-stone-200 outline-none placeholder:text-stone-600"
          />
        </label>
        <div className="flex gap-4">
          {['All', 'Ongoing', 'Finished'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`pb-3 text-sm transition-colors ${
                status === s ? 'text-purple-300' : 'text-stone-600 hover:text-stone-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar mt-6 flex gap-5 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setCat(f);
              setParams(f === 'All' ? {} : { cat: f });
            }}
            className={`whitespace-nowrap pb-1 text-sm transition-colors ${
              cat === f ? 'text-purple-300' : 'text-stone-600 hover:text-stone-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono text-xs text-stone-700">
        {list.length} / {PROJECTS.length} projects
      </p>

      <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {list.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => onPick(p)}
            className={`group flex w-full items-center gap-5 py-6 text-left transition-colors hover:bg-white/[0.02] ${
              highlight && highlight !== p.slug ? 'opacity-40' : ''
            }`}
          >
            <span className="font-mono text-xs text-stone-700">{String(i + 1).padStart(2, '0')}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-purple-300">
                {p.title}
              </span>
              <span className="mt-1 block text-sm text-stone-500">{p.tagline}</span>
            </span>
            <span className="hidden shrink-0 font-mono text-xs text-stone-600 sm:block">{p.category}</span>
            <span
              className={`hidden shrink-0 font-mono text-xs lg:block ${
                p.status === 'Ongoing' ? 'text-purple-400/90' : 'text-stone-600'
              }`}
            >
              {p.status}
            </span>
            <span className="hidden shrink-0 font-mono text-xs text-stone-700 xl:block">{p.year}</span>
            <ArrowUpRightIcon size={16} className="shrink-0 text-stone-700 transition-all group-hover:translate-x-0.5 group-hover:text-purple-300" />
          </button>
        ))}
      </div>
      {list.length === 0 && (
        <div className="mt-8 border border-dashed border-white/15 p-12 text-center text-sm text-stone-500">
          Nothing matches. Clear the search or pick “All”.
        </div>
      )}
    </div>
  );
}

export function SelectedWork({ onPick }: { onPick: (p: Project) => void }) {
  const [hero, ...rest] = PROJECTS.slice(0, 4);
  return (
    <div>
      {/* flagship */}
      <button onClick={() => onPick(hero)} className="group block w-full border-b border-white/10 pb-12 text-left">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-stone-600">01</span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-purple-400/90">Flagship</span>
        </div>
        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h3 className="font-display text-4xl italic leading-[1.05] text-white transition-colors group-hover:text-purple-300 md:text-6xl">
            {hero.title}
          </h3>
          <span className="flex shrink-0 items-center gap-2 text-sm text-stone-500 transition-colors group-hover:text-purple-300">
            View case file
            <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-400">{hero.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {hero.stack.map((s) => (
            <span key={s} className="font-mono text-xs text-stone-500">
              {s}
            </span>
          ))}
        </div>
      </button>

      {/* index rows */}
      <div className="divide-y divide-white/10">
        {rest.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => onPick(p)}
            className="group flex w-full items-center gap-5 py-7 text-left transition-colors hover:bg-white/[0.02]"
          >
            <span className="font-mono text-xs text-stone-700">{String(i + 2).padStart(2, '0')}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-purple-300 md:text-2xl">
                {p.title}
              </span>
              <span className="mt-1 block text-sm text-stone-500">{p.tagline}</span>
            </span>
            <span className="hidden shrink-0 font-mono text-xs text-stone-600 md:block">{p.category}</span>
            <span className="hidden shrink-0 font-mono text-xs text-stone-600 lg:block">{p.year}</span>
            <ArrowUpRightIcon size={16} className="shrink-0 text-stone-700 transition-all group-hover:translate-x-0.5 group-hover:text-purple-300" />
          </button>
        ))}
      </div>

      <Link
        to="/projects"
        className="group mt-10 inline-flex items-center gap-2.5 border-b border-white/20 pb-1 text-sm font-semibold text-stone-200 transition-colors hover:border-purple-400 hover:text-purple-300"
      >
        View the full archive
        <span className="font-mono text-xs text-stone-500">{PROJECTS.length} projects</span>
        <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export function ProjectModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
  if (!p) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/70" onClick={onClose}>
      <div className="flex h-full items-center justify-center p-4 sm:p-6">
      <div
        className="anim-fade max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0813] p-6 sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-purple-400/90">
            {p.category} · {p.year}
          </span>
          <button onClick={onClose} className="ml-auto text-xs text-stone-500 transition-colors hover:text-white">
            Close ✕
          </button>
        </div>
        <h2 className="font-display mt-5 text-4xl italic leading-tight text-white md:text-5xl">{p.title}</h2>
        <p className="mt-2 text-sm text-stone-500">{p.tagline}</p>
        <p className="mt-7 leading-relaxed text-stone-300">{p.description}</p>

        <div className="mt-9 border-t border-white/10 pt-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-600">Stack</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
            {p.stack.map((s) => (
              <span key={s} className="font-mono text-xs text-stone-400">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-600">
            Status — <span className="text-purple-300">{p.status}</span>
          </span>
          <span className="flex flex-wrap items-center gap-5">
            {p.links?.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white underline decoration-purple-400/60 underline-offset-4 transition-colors hover:text-purple-300">
                {l.label} ↗
              </a>
            ))}
            <a href={`mailto:contact@vibeyuno.me?subject=${encodeURIComponent(`Enquiry — ${p.title}`)}`} className="text-sm font-semibold text-white underline decoration-purple-400/60 underline-offset-4 transition-colors hover:text-purple-300">
              Ask about this build
            </a>
          </span>
        </div>
      </div>
      </div>
    </div>
  );
}
