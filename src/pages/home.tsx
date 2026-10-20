import { Link } from 'react-router-dom';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon, BotIcon, GlobeIcon, GamepadIcon, SparklesIcon } from '../components/icons';
import { PROJECTS, STACK_GROUPS, JOURNEY, SERVICES, NOTES, CONTACTS, ROLES } from '../data';
import { Section } from '../components/section';
import { Reveal, CountUp } from '../components/reveal';
import { SelectedWork } from '../components/projects';
import { ContactForm, Guestbook } from '../components/forms';
import type { Project } from '../data';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  globe: <GlobeIcon size={18} />,
  bot: <BotIcon size={18} />,
  gamepad: <GamepadIcon size={18} />,
  sparkles: <SparklesIcon size={18} />,
};

const FACTS = [
  { value: '18', label: 'Products shipped' },
  { value: '461+', label: 'Backend tests passing' },
  { value: '5', label: 'Production plugin suites' },
  { value: '10M+', label: 'Packets/sec firewall target' },
];

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_-10%,rgba(168,85,247,0.16),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-36 md:pt-44">
        <div className="grid items-end gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="anim-fade text-[11px] font-medium uppercase tracking-[0.35em] text-stone-500">
              Yuno · Kathmandu
            </p>
            <h1 className="anim-rise mt-7 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-[4.5rem]">
              I build the software
              <br />
              that runs <span className="font-display font-normal italic text-purple-300">live</span> businesses.
            </h1>
            <p className="anim-rise mt-8 max-w-xl text-lg leading-relaxed text-stone-400" style={{ animationDelay: '120ms' }}>
              Paid Minecraft server and plugin developer. Full-stack web engineer. Currently managing{' '}
              <span className="text-stone-200">YetiMC</span> and CEO of{' '}
              <span className="text-stone-200">StrenoxCloud</span> — hosting, panels, plugins and infrastructure that stay online.
            </p>
            <div className="anim-rise mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: '200ms' }}>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-stone-900 transition-all hover:bg-purple-200"
              >
                See selected work
                <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-stone-200 transition-colors hover:border-white/40 hover:text-white"
              >
                Start a project
                <ArrowDownIcon size={15} />
              </a>
            </div>
          </div>

          <div className="anim-fade lg:col-span-4" style={{ animationDelay: '260ms' }}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img src="/avatar.png" alt="Yuno" fetchPriority="high" decoding="async" className="aspect-square w-full object-cover" />
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
              <span className="text-sm text-stone-300">Yuno</span>
              <span className="text-xs text-stone-500">Strenox · YetiMC</span>
            </div>
          </div>
        </div>

        <div className="anim-fade mt-20 grid grid-cols-2 gap-y-8 border-t border-white/10 pt-8 md:grid-cols-4" style={{ animationDelay: '340ms' }}>
          {FACTS.map((f) => (
            <div key={f.label}>
              <p className="font-display text-4xl italic text-white md:text-5xl">{f.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-500">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomePage({ onPick }: { onPick: (p: Project) => void }) {
  return (
    <main>
      <Hero />

      <Section kicker="Practice" title={<>What I do<span className="text-purple-400">.</span></>} blurb="Five roles, one standard: it ships, it holds up, and it earns its keep.">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={Math.min(i, 3) * 70}>
              <div className="group grid gap-2 py-8 md:grid-cols-12 md:gap-8">
                <p className="font-mono text-xs text-stone-600 md:col-span-1">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-2xl font-semibold tracking-tight text-white md:col-span-4 md:text-3xl">{r.title}</h3>
                <p className="text-sm uppercase tracking-[0.18em] text-stone-500 md:col-span-2">{r.org}</p>
                <p className="text-sm leading-relaxed text-stone-400 md:col-span-5">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="border-y border-white/[0.07]">
        <Section kicker="Work" title={<>Selected projects<span className="text-purple-400">.</span></>} blurb="Real products, real deployments. The full archive has search and filters.">
          <Reveal>
            <SelectedWork onPick={onPick} />
          </Reveal>
        </Section>
      </div>

      <Section kicker="Services" title={<>How I can help<span className="text-purple-400">.</span></>} blurb="Fixed scope, fixed price, no surprises. Message me for anything outside these.">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 90}>
              <div className="h-full bg-[#0a0813] p-8 transition-colors hover:bg-[#100c1c]">
                <div className="flex items-center gap-3">
                  <span className="text-purple-400">{SERVICE_ICONS[s.icon]}</span>
                  <span className="ml-auto font-mono text-xs text-stone-500">{s.price}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="border-y border-white/[0.07]">
        <Section kicker="Stack" title={<>Tools of the trade<span className="text-purple-400">.</span></>} blurb="Nineteen tools, grouped by the job they do.">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 md:grid-cols-4">
            {STACK_GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={(i % 4) * 70}>
                <div className="h-full bg-[#0a0813] p-6">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">{g.title}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                    {g.items.map((t) => (
                      <span key={t} className="text-sm text-stone-300 transition-colors hover:text-purple-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <Section kicker="Background" title={<>The road here<span className="text-purple-400">.</span></>}>
        <Reveal>
          <ol className="relative ml-2 space-y-10 border-l border-white/10 pl-8">
            {JOURNEY.map((j) => (
              <li key={j.title} className="relative">
                <span className="absolute -left-[35px] top-2 h-2 w-2 rounded-full bg-purple-400 ring-4 ring-[#070613]" />
                <p className="text-[11px] uppercase tracking-[0.2em] text-purple-400/80">{j.period}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{j.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-400">{j.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <div className="border-y border-white/[0.07]">
        <Section kicker="Notes" title={<>Field notes<span className="text-purple-400">.</span></>} blurb="Short write-ups on what actually worked.">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {NOTES.map((n, i) => (
              <Reveal key={n.slug} delay={(i % 3) * 80}>
                <Link to={`/notes#${n.slug}`} className="group block h-full bg-[#0a0813] p-7 transition-colors hover:bg-[#100c1c]">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                    {n.date} · {n.minutes} min
                  </p>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-purple-300">{n.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-400">{n.body[0]}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <Section
        kicker="Contact"
        title={<>Tell me what you're building<span className="text-purple-400">.</span></>}
        blurb="Servers, plugins, panels, storefronts. I reply to every message within a day."
      >
        <div id="contact" className="grid scroll-mt-28 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>
          <div className="space-y-8 lg:col-span-5">
            <Reveal delay={90}>
            <div className="border-t border-white/10 pt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Direct</p>
              <div className="mt-4 space-y-2.5 text-sm">
                <a className="block text-stone-300 transition-colors hover:text-purple-300" href={`mailto:${CONTACTS.email}`}>
                  {CONTACTS.email}
                </a>
                <a className="block text-stone-300 transition-colors hover:text-purple-300" href={CONTACTS.discord.href} target="_blank" rel="noreferrer">
                  Discord — {CONTACTS.discord.label}
                </a>
                <a className="block text-stone-300 transition-colors hover:text-purple-300" href={CONTACTS.whatsapp.href} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <a className="flex items-center gap-1 text-stone-300 transition-colors hover:text-purple-300" href={CONTACTS.github.href} target="_blank" rel="noreferrer">
                  GitHub — {CONTACTS.github.label} <ArrowUpRightIcon size={13} />
                </a>
              </div>
            </div>
            </Reveal>
            <Reveal delay={150}>
              <Guestbook />
            </Reveal>
          </div>
        </div>
      </Section>

      <div className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-display text-2xl italic leading-relaxed text-stone-300 md:text-3xl">
              “Vibe coders know nothing” — said by people who ship nothing.
            </p>
            <footer className="mt-5 text-[11px] uppercase tracking-[0.25em] text-stone-600">
              {PROJECTS.length} builds · 461 tests · zero excuses
            </footer>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
