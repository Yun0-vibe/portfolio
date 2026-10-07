import type { ReactNode } from 'react';

export function Section({ id, kicker, title, blurb, children }: { id?: string; kicker: string; title: ReactNode; blurb?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime-700 dark:text-lime-400">{kicker}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
      {blurb && <p className="mt-2 max-w-2xl leading-relaxed text-stone-500 dark:text-stone-400">{blurb}</p>}
      <div className="mt-7">{children}</div>
    </section>
  );
}
