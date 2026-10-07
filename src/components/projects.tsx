import { useMemo, useState } from 'react';
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
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="card flex flex-1 items-center gap-2 rounded-xl px-4 py-2.5 text-sm">
          <SearchIcon size={15} className="shrink-0 text-stone-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="~/search projects, stacks, ideas…"
            className="w-full bg-transparent font-mono text-stone-200 outline-none placeholder:text-stone-600"
          />
        </label>
        <div className="flex gap-2">
          {['All', 'Ongoing', 'Finished'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-lg px-3 py-2 font-mono text-xs transition-colors ${
                status === s ? 'bg-lime-500 font-bold text-black' : 'card text-stone-400 hover:text-white'
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
            className={`whitespace-nowrap rounded-lg px-4 py-2 font-mono text-sm transition-colors ${
              cat === f ? 'bg-lime-500 font-bold text-black' : 'card text-stone-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="mt-3 font-mono text-xs text-stone-600">
        <span className="text-lime-400">{list.length}</span>/{PROJECTS.length} builds loaded
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.slug} p={p} dim={!!highlight && highlight !== p.slug} onOpen={() => onPick(p)} />
        ))}
      </div>
      {list.length === 0 && (
        <div className="card mt-4 rounded-2xl border-dashed p-10 text-center font-mono text-sm text-stone-500">
          404: nothing matches. Try clearing search or picking "All".
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ p, onOpen, dim, compact }: { p: Project; onOpen: () => void; dim?: boolean; compact?: boolean }) {
  return (
    <button
      onClick={onOpen}
      className={`card card-hover group flex flex-col rounded-2xl p-5 text-left ${dim ? 'opacity-40' : ''}`}
    >
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full shadow-[0_0_10px_currentColor]" style={{ background: p.accent, color: p.accent }} />
        <span className="font-mono text-[11px] uppercase tracking-widest text-stone-500">{p.category}</span>
        <span
          className={`ml-auto rounded-full px-2 py-0.5 font-mono text-[11px] ${
            p.status === 'Ongoing' ? 'bg-lime-500/15 text-lime-300' : 'bg-white/5 text-stone-500'
          }`}
        >
          ● {p.status}
        </span>
      </div>
      <h3 className="mt-3 text-xl font-bold tracking-tight text-white">
        {p.title}
        <ArrowUpRightIcon size={16} className="ml-1 inline text-stone-600 transition-all group-hover:translate-x-0.5 group-hover:text-lime-400" />
      </h3>
      <p className="mt-1 font-mono text-[13px] text-stone-500">{p.tagline}</p>
      {!compact && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-400">{p.description}</p>}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-stone-300">
            {s}
          </span>
        ))}
      </div>
      <span className="mt-4 font-mono text-[11px] text-stone-600">{p.year}</span>
    </button>
  );
}

export function SelectedWork({ onPick }: { onPick: (p: Project) => void }) {
  const [hero, ...rest] = PROJECTS.slice(0, 3);
  return (
    <div>
      <button onClick={() => onPick(hero)} className="card card-hover group grid w-full overflow-hidden rounded-3xl text-left md:grid-cols-5">
        <div className="relative flex min-h-56 flex-col justify-end overflow-hidden p-6 sm:p-8 md:col-span-3 md:min-h-72 md:p-10">
          <div className="blob left-[-60px] top-[-60px] h-64 w-64 opacity-30" style={{ background: hero.accent }} />
          <div className="grid-bg absolute inset-0" style={{ maskImage: 'none', WebkitMaskImage: 'none' }} />
          <div className="relative">
            <div className="flex items-center gap-2">
              <TerminalIcon size={14} className="text-lime-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-lime-300">featured build</span>
            </div>
            <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">{hero.title}</h3>
            <p className="mt-2 font-mono text-sm text-stone-400">{hero.tagline}</p>
          </div>
        </div>
        <div className="flex flex-col border-t border-white/[0.07] p-6 sm:p-8 md:col-span-2 md:border-l md:border-t-0">
          <p className="line-clamp-4 text-sm leading-relaxed text-stone-400">{hero.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {hero.stack.map((s) => (
              <span key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-stone-300">
                {s}
              </span>
            ))}
          </div>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-sm font-bold text-lime-300">
            Open case file <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </button>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rest.map((p) => (
          <ProjectCard key={p.slug} p={p} onOpen={() => onPick(p)} />
        ))}
      </div>
      <Link
        to="/projects"
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 font-mono text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-lime-500/50 hover:text-lime-300"
      >
        ~/view-all <span className="text-stone-500">{PROJECTS.length} projects</span> <ArrowRightIcon size={15} />
      </Link>
    </div>
  );
}

export function ProjectModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  if (!p) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        className="anim-pop max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-stone-950 p-6 shadow-[0_0_80px_-16px_rgba(132,204,22,0.3)] sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: p.accent }} />
          <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
            {p.category} · {p.year}
          </span>
          <button onClick={onClose} className="ml-auto rounded-lg border border-white/10 px-3 py-1 font-mono text-xs text-stone-400 hover:text-white">
            esc — close
          </button>
        </div>
        <h2 className="font-display mt-3 text-4xl italic text-white">{p.title}</h2>
        <p className="mt-1 font-mono text-sm text-stone-500">{p.tagline}</p>
        <p className="mt-4 leading-relaxed text-stone-300">{p.description}</p>
        <div className="mt-5">
          <p className="font-mono text-xs uppercase tracking-widest text-stone-500">Stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-lg bg-lime-500 px-3 py-1 font-mono text-xs font-bold text-black">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="card mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
          <span className="font-mono text-sm text-stone-400">
            status: <strong className="text-lime-300">{p.status}</strong>
          </span>
          <span className="flex flex-wrap items-center gap-3">
            {p.links?.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold text-white underline decoration-lime-500 underline-offset-4">
                {l.label} ↗
              </a>
            ))}
            <a href={`mailto:contact@vibeyuno.me?subject=${encodeURIComponent(`Question about ${p.title}`)}`} className="font-mono text-sm font-bold text-white underline decoration-lime-500 underline-offset-4">
              ask_about_this.build
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
