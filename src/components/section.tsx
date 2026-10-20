import type { ReactNode } from 'react';

export function Section({ id, kicker, title, blurb, children }: { id?: string; kicker: string; title: ReactNode; blurb?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:py-28">
      <div className="flex items-center gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-purple-400/90">{kicker}</p>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <h2 className="mt-6 text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">{title}</h2>
      {blurb && <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-400">{blurb}</p>}
      <div className="mt-12">{children}</div>
    </section>
  );
}
