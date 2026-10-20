import { Section } from '../components/section';
import { Reveal } from '../components/reveal';
import { STACK_GROUPS } from '../data';

export function UsesPage() {
  return (
    <main className="pt-28">
      <Section kicker="Setup" title={<>Loadout<span className="text-purple-400">.</span></>} blurb="The bench behind the builds — and how this site is made.">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          <Reveal>
            <div className="h-full bg-[#0a0813] p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Daily setup</h3>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-stone-400">
                <li><span className="text-stone-200">Editor —</span> VS Code with an AI assistant for scaffolding; every shipped line reviewed by hand.</li>
                <li><span className="text-stone-200">Hosting —</span> StrenoxCloud for game nodes, Vercel for web, Oracle Cloud and AWS for the heavy lifting.</li>
                <li><span className="text-stone-200">Stack —</span> TypeScript, React and Next.js on the front; Node, FastAPI, Go and PHP behind; Postgres, MySQL and Mongo for data.</li>
                <li><span className="text-stone-200">Ops —</span> Nginx at the edge, an XDP firewall in front of it, backups before every risky change.</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="h-full bg-[#0a0813] p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">This site</h3>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-stone-400">
                <li><span className="text-stone-200">Build —</span> Vite, React 19, TypeScript and Tailwind CSS.</li>
                <li><span className="text-stone-200">Routes —</span> react-router, lazy loaded: home, work, notes, setup.</li>
                <li><span className="text-stone-200">Contact —</span> A Vercel serverless function that mails straight to my inbox.</li>
                <li><span className="text-stone-200">Motion —</span> Scroll reveals and page transitions, with reduced-motion respected.</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <h3 className="mt-14 text-[11px] uppercase tracking-[0.2em] text-stone-600">Full stack</h3>
        <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 md:grid-cols-4">
          {STACK_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 4) * 70}>
              <div className="h-full bg-[#0a0813] p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">{g.title}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-stone-300">
                  {g.items.map((t) => (
                    <li key={t} className="transition-colors hover:text-purple-300">{t}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
