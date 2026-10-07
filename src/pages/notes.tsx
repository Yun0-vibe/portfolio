import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { NOTES } from '../data';
import { Section } from '../components/section';

export function NotesPage() {
  const [open, setOpen] = useState<string | null>(() => window.location.hash.replace('#', '') || null);
  const active = NOTES.find((n) => n.slug === open);

  return (
    <main>
      <Section kicker="Notes" title={<>Notes & lessons<span className="text-lime-700">.</span></>} blurb="No newsletter popups. Just things that worked.">
        {!active ? (
          <div className="space-y-3">
            {NOTES.map((n) => (
              <button
                key={n.slug}
                onClick={() => {
                  setOpen(n.slug);
                  window.location.hash = n.slug;
                }}
                className="flex w-full items-center gap-4 rounded-2xl border border-stone-900/10 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="flex-1">
                  <p className="flex items-center gap-2 font-mono text-[11px] text-stone-400">
                    {n.date} <span className="flex items-center gap-1"><Clock size={11} /> {n.minutes} min</span>
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{n.title}</h3>
                </div>
                <span className="font-mono text-xs text-stone-400">read →</span>
              </button>
            ))}
          </div>
        ) : (
          <article className="mx-auto max-w-2xl">
            <button
              onClick={() => {
                setOpen(null);
                window.location.hash = '';
              }}
              className="flex items-center gap-1 font-mono text-xs text-stone-400 hover:underline"
            >
              <ArrowLeft size={13} /> all notes
            </button>
            <p className="mt-4 font-mono text-xs text-stone-400">
              {active.date} · {active.minutes} min read
            </p>
            <h1 className="font-display mt-2 text-4xl italic leading-tight">{active.title}</h1>
            <div className="prose-notes mt-6 text-[15px] text-stone-600 dark:text-stone-300">
              {active.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-stone-900/5 p-5 text-sm dark:bg-white/5">
              Enjoyed this? <Link to="/#contact" className="font-bold underline">Tell me what you're building</Link> — I reply to every message.
            </div>
          </article>
        )}
      </Section>
    </main>
  );
}
