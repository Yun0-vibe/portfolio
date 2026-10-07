import { Section } from '../components/section';
import { Reveal } from '../components/reveal';
import { STACK_GROUPS } from '../data';

export function UsesPage() {
  return (
    <main className="pt-24">
      <Section kicker="uses" title={<>Loadout<span className="text-purple-400">.</span></>} blurb="The setup behind the builds — and how this site itself is made.">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
          <div className="card h-full rounded-2xl p-6">
            <h3 className="font-mono font-bold text-white">~/daily-setup</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-400">
              <li><strong className="text-white">Editor:</strong> VS Code + AI assistant for scaffolding, manual review for everything shipped</li>
              <li><strong className="text-white">Hosting:</strong> Vercel for web, StrenoxCloud + Oracle Cloud / AWS for game servers</li>
              <li><strong className="text-white">Stack:</strong> TypeScript + React/Next.js up front, Go/Python/Java behind, Postgres/MySQL/MongoDB for data</li>
              <li><strong className="text-white">Ops:</strong> Nginx edge, XDP firewall, GitHub version control, backups before big changes</li>
            </ul>
          </div>
          </Reveal>
          <Reveal delay={90}>
          <div className="card h-full rounded-2xl p-6">
            <h3 className="font-mono font-bold text-white">~/this-site</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-400">
              <li><strong className="text-white">Build:</strong> Vite + React 19 + TypeScript + Tailwind CSS, dark command-center theme</li>
              <li><strong className="text-white">Routes:</strong> react-router, lazy-loaded — / · /projects · /notes · /uses</li>
              <li><strong className="text-white">Contact:</strong> Vercel serverless function at /api/contact</li>
              <li><strong className="text-white">Motion:</strong> scroll reveals, counters, page transitions — reduced-motion respected</li>
            </ul>
          </div>
          </Reveal>
        </div>

        <h3 className="mt-10 font-mono text-xs uppercase tracking-widest text-stone-500">~/full-stack-list</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {STACK_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 4) * 80}>
            <div className="card card-hover h-full rounded-2xl p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-stone-500">{g.title}</p>
              <ul className="mt-2 space-y-1 font-mono text-sm text-stone-300">
                {g.items.map((t) => (
                  <li key={t}><span className="text-purple-500">›</span> {t}</li>
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
