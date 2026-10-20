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
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="flex flex-1 items-center gap-3 border-b border-white/15 pb-3 text-sm md:max-w-sm">
          <SearchIcon size={15} className="shrink-0 text-stone-700" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects…"
            className="w-full bg-transparent text-stone-200 outline-none placeholder:text-stone-700"
          />
        </label>
        <div className="flex flex-wrap gap-5">
          {['All', 'Ongoing', 'Finished'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`label transition-colors ${
                status === s ? 'text-white' : 'hover:text-stone-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar mt-7 flex gap-6 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setCat(f);
              setParams(f === 'All' ? {} : { cat: f });
            }}
            className={`label whitespace-nowrap transition-colors ${
              cat === f ? 'text-white' : 'hover:text-stone-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="mt-4 font-meta text-[11px] text-stone-700">
        {list.length} / {PROJECTS.length}
      </p>

      <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2">
        {list.map((p, i) => (
          <div key={p.slug} className={highlight && highlight !== p.slug ? 'opacity-40' : ''}>
            <ProjectCard p={p} index={i + 1} onOpen={() => onPick(p)} />
          </div>
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

export function ProjectCard({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group flex h-full flex-col border border-white/10 bg-white/[0.015] p-6 text-left transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.04] md:p-7"
    >
      <div className="flex items-center gap-4">
        <span className="font-meta text-[11px] text-stone-700">{String(index).padStart(2, '0')}</span>
        <span className="font-meta text-[10px] uppercase tracking-[0.18em] text-stone-600">{p.category}</span>
        <span className="ml-auto font-meta text-[10px] uppercase tracking-[0.18em] text-stone-700">{p.status}</span>
      </div>

      <h3 className="mt-7 text-xl font-medium leading-tight tracking-[-0.02em] text-white transition-colors group-hover:text-stone-300 md:text-[1.4rem]">
        {p.title}
      </h3>
      <p className="mt-2 text-sm text-stone-500">{p.tagline}</p>
      <p className="mt-5 line-clamp-3 text-[13.5px] leading-relaxed text-stone-500">{p.description}</p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <span className="font-meta text-[11px] text-stone-600">{p.stack.join('  ·  ')}</span>
        <ArrowUpRightIcon size={15} className="shrink-0 text-stone-700 transition-all group-hover:translate-x-0.5 group-hover:text-white" />
      </div>
    </button>
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
        className="anim-fade max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-white/10 bg-[#101012] p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <span className="font-meta text-[10px] uppercase tracking-[0.18em] text-stone-600">
            {p.category} · {p.year}
          </span>
          <button onClick={onClose} className="ml-auto text-xs text-stone-600 transition-colors hover:text-white">
            Close ✕
          </button>
        </div>
        <h2 className="font-display mt-6 text-4xl italic leading-tight text-white md:text-5xl">{p.title}</h2>
        <p className="mt-3 text-sm text-stone-500">{p.tagline}</p>
        <p className="mt-7 text-[15px] leading-relaxed text-stone-300">{p.description}</p>

        <div className="mt-9 border-t border-white/10 pt-6">
          <p className="label">Stack</p>
          <p className="mt-3 font-meta text-xs text-stone-400">{p.stack.join('  ·  ')}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
          <span className="label">
            Status — <span className="text-stone-300">{p.status}</span>
          </span>
          <span className="flex flex-wrap items-center gap-6">
            {p.links?.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link text-sm font-medium text-white">
                {l.label} ↗
              </a>
            ))}
            <a href={`mailto:contact@vibeyuno.me?subject=${encodeURIComponent(`Enquiry — ${p.title}`)}`} className="link text-sm font-medium text-white">
              Ask about this build
            </a>
          </span>
        </div>
      </div>
      </div>
    </div>
  );
}
