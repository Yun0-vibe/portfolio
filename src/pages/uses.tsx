import { Section } from '../components/section';
import { STACK_GROUPS } from '../data';

export function UsesPage() {
  return (
    <main>
      <Section kicker="Uses & colophon" title={<>What I work with<span className="text-lime-700">.</span></>} blurb="The setup behind the builds — and how this site itself is made.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <h3 className="font-bold">Daily setup</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              <li><strong>Editor:</strong> VS Code + AI assistant for scaffolding, manual review for everything shipped</li>
              <li><strong>Hosting:</strong> Vercel for web, Pterodactyl + Oracle Cloud / AWS for game servers</li>
              <li><strong>Stack:</strong> TypeScript + React/Next.js up front, Node/PHP/Java behind, MySQL/MongoDB/Firebase for data</li>
              <li><strong>Ops:</strong> Nginx reverse proxy, GitHub for version control, backups before big changes</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-stone-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <h3 className="font-bold">This site (v2 revamp)</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              <li><strong>Framework:</strong> Vite + React 19 + TypeScript + Tailwind CSS</li>
              <li><strong>Routing:</strong> react-router with / · /projects · /notes · /uses</li>
              <li><strong>Contact:</strong> Vercel serverless function at /api/contact (optional CONTACT_WEBHOOK_URL forwarding)</li>
              <li><strong>Design:</strong> light editorial paper theme + dark mode, no custom cursor, no inspect-blocking — readable and fast</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-10 font-mono text-xs uppercase tracking-widest text-stone-400">Full stack list</h3>
        <div className="mt-3 grid gap-4 md:grid-cols-4">
          {STACK_GROUPS.map((g) => (
            <div key={g.title} className="rounded-2xl border border-stone-900/10 p-5 dark:border-white/10">
              <p className="font-mono text-xs uppercase tracking-widest text-stone-400">{g.title}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {g.items.map((t) => (
                  <li key={t}>· {t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
