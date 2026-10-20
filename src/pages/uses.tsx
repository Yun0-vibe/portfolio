import { Reveal } from '../components/reveal';
import { STACK_GROUPS } from '../data';

export function UsesPage() {
  return (
    <main className="pt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="flex items-baseline justify-between gap-6">
          <h1 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Setup</h1>
          <span className="label">Toolchain</span>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-white">Daily setup</h2>
              <dl className="mt-6 space-y-5">
                {[
                  ['Editor', 'VS Code with an AI assistant for scaffolding; every shipped line reviewed by hand.'],
                  ['Hosting', 'StrenoxCloud for game nodes, Vercel for web, Oracle Cloud and AWS for the heavy lifting.'],
                  ['Stack', 'TypeScript, React and Next.js on the front; Node, FastAPI, Go and PHP behind; Postgres, MySQL and Mongo for data.'],
                  ['Ops', 'Nginx at the edge, an XDP firewall in front of it, backups before every risky change.'],
                ].map(([k, v]) => (
                  <div key={k} className="rule pt-4">
                    <dt className="label">{k}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-stone-400">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-white">This site</h2>
              <dl className="mt-6 space-y-5">
                {[
                  ['Build', 'Vite, React 19, TypeScript and Tailwind CSS.'],
                  ['Routes', 'react-router, lazy loaded: home, work, notes, setup.'],
                  ['Contact', 'A Vercel serverless function that mails straight to my inbox.'],
                  ['Motion', 'Scroll reveals and page transitions, with reduced-motion respected.'],
                ].map(([k, v]) => (
                  <div key={k} className="rule pt-4">
                    <dt className="label">{k}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-stone-400">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <h2 className="mt-20 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Full stack</h2>
        <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2 md:grid-cols-4">
          {STACK_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 4) * 60}>
              <div className="h-full bg-[#0a0a0b] p-6">
                <p className="label">{g.title}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-stone-400">
                  {g.items.map((t) => (
                    <li key={t} className="transition-colors hover:text-white">{t}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
