import type { ReactNode } from 'react';

export function Section({ id, kicker, title, blurb, children }: { id?: string; kicker: string; title: ReactNode; blurb?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime-400">
        <span className="text-stone-600">$</span> {kicker}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h2>
      {blurb && <p className="mt-3 max-w-2xl leading-relaxed text-stone-400">{blurb}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
