import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon } from '../components/icons';
import { NOTES } from '../data';
import { Reveal } from '../components/reveal';

export function NotesPage() {
  const [open, setOpen] = useState<string | null>(() => window.location.hash.replace('#', '') || null);
  const active = NOTES.find((n) => n.slug === open);

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="flex items-baseline justify-between gap-6">
          <h1 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Notes</h1>
          <span className="label">{NOTES.length} entries</span>
        </div>

        {!active ? (
          <div className="mt-12">
            {NOTES.map((n, i) => (
              <Reveal key={n.slug} delay={i * 60}>
                <button
                  onClick={() => {
                    setOpen(n.slug);
                    window.location.hash = n.slug;
                  }}
                  className="group rule flex w-full items-baseline gap-6 py-7 text-left"
                >
                  <span className="font-meta text-[11px] text-stone-700">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-medium tracking-[-0.02em] text-white transition-colors group-hover:text-stone-400 md:text-2xl">
                      {n.title}
                    </span>
                    <span className="mt-2 flex items-center gap-3 font-meta text-[11px] text-stone-700">
                      {n.date} <span className="flex items-center gap-1"><ClockIcon size={10} /> {n.minutes} min</span>
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-stone-700 transition-colors group-hover:text-stone-400">Read →</span>
                </button>
              </Reveal>
            ))}
          </div>
        ) : (
          <article className="anim-fade mx-auto max-w-2xl">
            <button
              onClick={() => {
                setOpen(null);
                window.location.hash = '';
              }}
              className="flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-white"
            >
              <ArrowLeftIcon size={13} /> All notes
            </button>
            <p className="mt-10 font-meta text-[11px] text-stone-700">
              {active.date} · {active.minutes} min read
            </p>
            <h1 className="font-display mt-4 text-4xl italic leading-tight text-white md:text-5xl">{active.title}</h1>
            <div className="prose-notes mt-9 border-t border-white/10 pt-8 text-[15px] leading-relaxed text-stone-300">
              {active.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10 border-t border-white/10 pt-6 text-sm text-stone-500">
              Enjoyed this?{' '}
              <Link to="/#contact" className="link font-medium text-white">
                Tell me what you're building
              </Link>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
