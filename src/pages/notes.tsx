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
    <main className="pt-24">
      <Section kicker="notes" title={<>Field logs<span className="text-purple-400">.</span></>} blurb="No newsletter popups. Just things that worked.">
        {!active ? (
          <div className="space-y-3">
            {NOTES.map((n, i) => (
              <Reveal key={n.slug} delay={i * 70}>
              <button
                onClick={() => {
                  setOpen(n.slug);
                  window.location.hash = n.slug;
                }}
                className="card card-hover flex w-full items-center gap-4 rounded-2xl p-5 text-left"
              >
                <div className="flex-1">
                  <p className="flex items-center gap-2 font-mono text-[11px] text-stone-500">
                    {n.date} <span className="flex items-center gap-1"><ClockIcon size={11} /> {n.minutes} min</span>
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">{n.title}</h3>
                </div>
                <span className="font-mono text-xs text-purple-400">read →</span>
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
              className="flex items-center gap-1 font-mono text-xs text-stone-500 transition-colors hover:text-purple-300"
            >
              <ArrowLeftIcon size={13} /> all notes
            </button>
            <p className="mt-4 font-mono text-xs text-stone-500">
              {active.date} · {active.minutes} min read
            </p>
            <h1 className="font-display mt-2 text-4xl italic leading-tight text-white">{active.title}</h1>
            <div className="prose-notes mt-6 text-[15px] text-stone-300">
              {active.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="card mt-8 rounded-2xl p-5 font-mono text-sm text-stone-400">
              enjoyed this? <Link to="/#contact" className="font-bold text-purple-300 underline underline-offset-4">tell me what you're building</Link>
            </div>
          </article>
        )}
      </Section>
    </main>
  );
}
