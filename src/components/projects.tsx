import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon, SearchIcon } from './icons';
import { PROJECTS, type Project } from '../data';

const FILTERS = ['All', 'Web', 'Plugin', 'Security', 'Infra', 'Bot', 'Store'] as const;

function hexToRgba(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function ProjectCard({
  p,
  index,
  onOpen,
  feature = false,
}: {
  p: Project;
  index: number;
  onOpen: () => void;
  feature?: boolean;
}) {
  const style = {
    '--tint': hexToRgba(p.accent, feature ? 0.2 : 0.12),
    '--edge': hexToRgba(p.accent, 0.22),
    '--glow': hexToRgba(p.accent, 0.16),
  } as React.CSSProperties;

  return (
    <button
      onClick={onOpen}
      style={style}
      className={`surface group flex h-full flex-col overflow-hidden rounded-2xl text-left ${
        feature ? 'sm:col-span-2' : ''
      }`}
    >
      <div className={`relative flex-1 ${feature ? 'p-8 md:p-12' : 'p-6 md:p-7'}`}>
        <div className="flex items-center gap-4">
          <span className="font-meta text-[11px] text-stone-600">{String(index).padStart(2, '0')}</span>
          <span className="font-meta text-[10px] uppercase tracking-[0.18em]" style={{ color: p.accent }}>
            {p.category}
          </span>
          <span className="ml-auto flex items-center gap-2 font-meta text-[10px] uppercase tracking-[0.18em] text-stone-600">
            {p.status === 'Ongoing' && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: p.accent }} />
            )}
            {p.status}
          </span>
        </div>

        <h3
          className={`mt-7 font-medium leading-[1.05] tracking-[-0.03em] text-white transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:text-stone-200 ${
            feature ? 'text-3xl md:text-5xl' : 'text-xl md:text-[1.6rem]'
          }`}
        >
          {p.title}
        </h3>
        <p className={`mt-3 ${feature ? 'text-base md:text-lg' : 'text-sm'} text-stone-400`}>{p.tagline}</p>
        <p
          className={`mt-5 max-w-2xl leading-relaxed text-stone-500 transition-colors duration-500 group-hover:text-stone-400 ${
            feature ? 'text-[15px] md:text-base' : 'line-clamp-3 text-[13.5px]'
          }`}
        >
          {p.description}
        </p>
      </div>

      <div
        className={`relative flex items-end justify-between gap-4 border-t border-white/10 ${
          feature ? 'px-8 py-6 md:px-12' : 'px-6 py-5 md:px-7'
        }`}
      >
        <span className="font-meta text-[11px] text-stone-600 transition-colors duration-500 group-hover:text-stone-300">
          {p.stack.join('  ·  ')}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-out group-hover:bg-white/10">
          <ArrowUpRightIcon
            size={16}
            className="text-stone-600 transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          />
        </span>
      </div>
    </button>
  );
}

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
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <label className="group flex flex-1 items-center gap-3 border-b border-white/10 pb-3 text-sm transition-colors focus-within:border-white/30 md:max-w-sm">
          <SearchIcon size={15} className="shrink-0 text-stone-600 transition-colors group-focus-within:text-stone-300" />
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
              className={`label transition-colors ${status === s ? 'text-white' : 'hover:text-stone-300'}`}
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {list.map((p, i) => (
          <div key={p.slug} className={highlight && highlight !== p.slug ? 'opacity-40' : ''}>
            <ProjectCard p={p} index={i + 1} onOpen={() => onPick(p)} />
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-8 border border-dashed border-white/12 p-12 text-center text-sm text-stone-500">
          Nothing matches. Clear the search or pick “All”.
        </div>
      )}
    </div>
  );
}

export function ProjectModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  if (!p) return null;
  const style = {
    '--tint': hexToRgba(p.accent, 0.16),
    '--edge': hexToRgba(p.accent, 0.24),
    '--glow': hexToRgba(p.accent, 0.18),
  } as React.CSSProperties;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          style={style}
          className="surface grain anim-pop max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4">
            <span className="font-meta text-[10px] uppercase tracking-[0.18em]" style={{ color: p.accent }}>
              {p.category} · {p.year}
            </span>
            <button onClick={onClose} className="ml-auto text-xs text-stone-600 transition-colors hover:text-white">
              Close ✕
            </button>
          </div>
          <h2 className="font-display mt-5 text-4xl italic leading-tight text-white md:text-5xl">{p.title}</h2>
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
              <a
                href={`mailto:contact@vibeyuno.me?subject=${encodeURIComponent(`Enquiry — ${p.title}`)}`}
                className="link text-sm font-medium text-white"
              >
                Ask about this build
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
