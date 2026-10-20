import type { ReactNode } from 'react';

export function Section({ id, kicker, title, blurb, children }: { id?: string; kicker: string; title: ReactNode; blurb?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:py-32">
      <div className="flex items-center gap-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">{kicker}</p>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <h2 className="mt-8 max-w-3xl text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-white md:text-5xl">{title}</h2>
      {blurb && <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-400">{blurb}</p>}
      <div className="mt-14">{children}</div>
    </section>
  );
}
