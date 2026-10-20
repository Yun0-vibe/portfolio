import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon } from '../components/icons';
import { NOTES } from '../data';
import { Section } from '../components/section';
import { Reveal } from '../components/reveal';

export function NotesPage() {
  const [open, setOpen] = useState<string | null>(() => window.location.hash.replace('#', '') || null);
  const active = NOTES.find((n) => n.slug === open);

  return (
    <main className="pt-28">
      <Section kicker="Notes" title={<>Field notes<span className="text-purple-400">.</span></>} blurb="No newsletter, no funnel. Just things that worked.">
        {!active ? (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {NOTES.map((n, i) => (
              <Reveal key={n.slug} delay={i * 70}>
                <button
                  onClick={() => {
                    setOpen(n.slug);
                    window.location.hash = n.slug;
                  }}
                  className="group flex w-full items-center gap-5 py-7 text-left"
                >
                  <span className="font-mono text-xs text-stone-700">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-purple-300 md:text-2xl">
                      {n.title}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2 text-xs text-stone-600">
                      {n.date} <span className="flex items-center gap-1"><ClockIcon size={11} /> {n.minutes} min</span>
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-stone-600 transition-colors group-hover:text-purple-300">Read →</span>
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
              className="flex items-center gap-1.5 text-xs text-stone-500 transition-colors hover:text-purple-300"
            >
              <ArrowLeftIcon size={13} /> All notes
            </button>
            <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-stone-600">
              {active.date} · {active.minutes} min read
            </p>
            <h1 className="font-display mt-3 text-4xl italic leading-tight text-white md:text-5xl">{active.title}</h1>
            <div className="prose-notes mt-8 text-[15px] leading-relaxed text-stone-300">
              {active.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10 border-t border-white/10 pt-6 text-sm text-stone-400">
              Enjoyed this?{' '}
              <Link to="/#contact" className="font-semibold text-purple-300 underline underline-offset-4">
                Tell me what you're building
              </Link>
            </div>
          </article>
        )}
      </Section>
    </main>
  );
}
