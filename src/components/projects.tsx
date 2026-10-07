import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { PROJECTS, type Project } from '../data';

const FILTERS = ['All', 'Web', 'Plugin', 'Bot', 'Store'] as const;

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
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-full border border-stone-900/15 px-4 py-2.5 text-sm dark:border-white/15">
          <Search size={15} className="shrink-0 text-stone-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects, stacks, ideas…"
            className="w-full bg-transparent outline-none placeholder:text-stone-400"
          />
        </label>
        <div className="flex gap-2">
          {['All', 'Ongoing', 'Finished'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full px-3 py-2 font-mono text-xs ${
                status === s ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'border border-stone-900/15 dark:border-white/15'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setCat(f);
              setParams(f === 'All' ? {} : { cat: f });
            }}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
              cat === f
                ? 'bg-lime-700 text-white'
                : 'border border-stone-900/15 text-stone-600 hover:bg-stone-900/5 dark:border-white/15 dark:text-stone-300 dark:hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="mt-3 font-mono text-xs text-stone-400">
        showing {list.length} of {PROJECTS.length} builds
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.slug} p={p} dim={!!highlight && highlight !== p.slug} onOpen={() => onPick(p)} />
        ))}
      </div>
      {list.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-stone-900/20 p-10 text-center text-sm text-stone-500 dark:border-white/20">
          Nothing matches. Try clearing search or picking "All".
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ p, onOpen, dim, compact }: { p: Project; onOpen: () => void; dim?: boolean; compact?: boolean }) {
  return (
    <button
      onClick={onOpen}
      className={`group flex flex-col rounded-2xl border border-stone-900/10 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] ${
        dim ? 'opacity-40' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.accent }} />
        <span className="font-mono text-[11px] uppercase tracking-widest text-stone-400">{p.category}</span>
        <span
          className={`ml-auto rounded-full px-2 py-0.5 font-mono text-[11px] ${
            p.status === 'Ongoing' ? 'bg-lime-600/15 text-lime-700 dark:text-lime-400' : 'bg-stone-900/5 text-stone-500 dark:bg-white/10 dark:text-stone-300'
          }`}
        >
          {p.status}
        </span>
      </div>
      <h3 className="mt-3 text-xl font-bold tracking-tight">
        {p.title}
        <ArrowUpRight size={16} className="ml-1 inline opacity-0 transition-opacity group-hover:opacity-100" />
      </h3>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{p.tagline}</p>
      {!compact && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{p.description}</p>}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span key={s} className="rounded-full bg-stone-900/5 px-2 py-1 font-mono text-[11px] dark:bg-white/10">
            {s}
          </span>
        ))}
      </div>
      <span className="mt-4 font-mono text-[11px] text-stone-400">{p.year}</span>
    </button>
  );
}

export function SelectedWork({ onPick }: { onPick: (p: Project) => void }) {
  const picks = PROJECTS.slice(0, 3);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {picks.map((p) => (
          <ProjectCard key={p.slug} p={p} onOpen={() => onPick(p)} />
        ))}
      </div>
      <Link
        to="/projects"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-stone-900"
      >
        View all {PROJECTS.length} projects <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export function ProjectModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  if (!p) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <div
        className="anim-pop max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-stone-900/10 bg-paper p-6 sm:rounded-3xl sm:p-8 dark:border-white/10 dark:bg-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: p.accent }} />
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
            {p.category} · {p.year}
          </span>
          <button onClick={onClose} className="ml-auto rounded-full border border-stone-900/15 px-3 py-1 font-mono text-xs dark:border-white/15">
            esc — close
          </button>
        </div>
        <h2 className="font-display mt-3 text-4xl italic">{p.title}</h2>
        <p className="mt-1 font-medium text-stone-500">{p.tagline}</p>
        <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-300">{p.description}</p>
        <div className="mt-5">
          <p className="font-mono text-xs uppercase tracking-widest text-stone-400">Stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full bg-stone-900 px-3 py-1 font-mono text-xs text-white dark:bg-white dark:text-stone-900">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-stone-900/5 p-4 dark:bg-white/5">
          <span className="text-sm">
            Status: <strong>{p.status}</strong>
          </span>
          <a href={`mailto:contact@vibeyuno.me?subject=${encodeURIComponent(`Question about ${p.title}`)}`} className="text-sm font-semibold underline">
            Ask about this build
          </a>
        </div>
      </div>
    </div>
  );
}
