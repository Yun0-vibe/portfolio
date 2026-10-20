import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon } from '../components/icons';
import { PROJECTS, NOTES, CONTACTS, ROLES } from '../data';
import { Reveal } from '../components/reveal';
import { ProjectCard } from '../components/projects';
import { ContactForm } from '../components/forms';
import type { Project } from '../data';

const PROOF = [
  { value: '18', label: 'Products shipped' },
  { value: '461+', label: 'Tests passing' },
  { value: '5', label: 'Plugin suites' },
];

export function Hero() {
  return (
    <div className="grain relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 -top-56 h-[520px] w-[520px] rounded-full bg-violet-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[380px] w-[380px] rounded-full bg-fuchsia-500/10 blur-[100px]" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="anim-fade label">Yuno — Software Engineer</p>
            <h1 className="anim-rise mt-10 text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] text-white sm:text-[3.75rem] md:text-[4.75rem]">
              Paid developer for
              <br />
              <span className="font-display text-grad font-normal italic">Minecraft</span> and the
              <br />
              modern web.
            </h1>
            <p className="anim-rise mt-9 max-w-xl text-lg leading-relaxed text-stone-400" style={{ animationDelay: '120ms' }}>
              I build and run production game servers, write commercial-grade Minecraft plugins, and ship
              full-stack web products — for people paying for the result, not the process.
            </p>
            <div className="anim-rise mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: '200ms' }}>
              <Link to="/projects" className="btn btn-primary group">
                View the work
                <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-ghost group"
              >
                Hire me
                <ArrowUpRightIcon size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="anim-fade lg:col-span-4 lg:col-start-9" style={{ animationDelay: '280ms' }}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-violet-500/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <img src="/avatar.png" alt="Yuno" fetchPriority="high" decoding="async" className="aspect-[4/5] w-full object-cover object-top" />
              </div>
            </div>
            <dl className="mt-6 space-y-2.5">
              {ROLES.map((r) => (
                <div key={r.title} className="flex items-baseline gap-3">
                  <span className="h-1 w-1 shrink-0 translate-y-[-3px] rounded-full bg-violet-400" />
                  <dt className="text-[13px] leading-snug text-stone-400">{r.title}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
          {PROOF.map((p, i) => (
            <div key={p.label} className="anim-fade" style={{ animationDelay: `${340 + i * 70}ms` }}>
              <p className="font-display text-4xl italic text-white md:text-5xl">{p.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-600">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Roles() {
  return (
    <section className="rule-b relative">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Practice</h2>
          <span className="label">03 disciplines</span>
        </div>

        <div className="mt-12">
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={i * 70}>
              <div className="rule group grid gap-x-8 gap-y-4 py-10 transition-colors duration-300 hover:bg-white/[0.015] md:grid-cols-12">
                <p className="font-meta text-[11px] text-stone-700 md:col-span-1">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-xl font-medium leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-violet-300 md:col-span-4 md:text-2xl">
                  {r.title}
                </h3>
                <div className="md:col-span-7">
                  <p className="text-[15px] leading-relaxed text-stone-400">{r.text}</p>
                  <p className="mt-4 font-meta text-[10px] uppercase tracking-[0.18em] text-stone-700">{r.org}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work({ onPick }: { onPick: (p: Project) => void }) {
  const [feature, ...rest] = PROJECTS.slice(0, 4);
  const grid = [PROJECTS[4], PROJECTS[5], PROJECTS[6], PROJECTS[7]];
  return (
    <section className="rule-b relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Selected work</h2>
          <span className="label">Flagship + 4 more</span>
        </div>

        <h2 className="mt-10 max-w-3xl text-3xl font-medium leading-[1.1] tracking-[-0.035em] text-white md:text-[3.25rem]">
          Things that are live, running, and paid for.
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <Reveal>
            <ProjectCard p={feature} index={1} onOpen={() => onPick(feature)} feature />
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}>
              <ProjectCard p={p} index={i + 2} onOpen={() => onPick(p)} />
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {grid.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}>
              <ProjectCard p={p} index={i + 5} onOpen={() => onPick(p)} />
            </Reveal>
          ))}
        </div>

        <Link
          to="/projects"
          className="btn btn-ghost group mt-12"
        >
          All {PROJECTS.length} projects
          <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

function Notes() {
  return (
    <section className="rule-b">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Notes</h2>
          <Link to="/notes" className="label transition-colors hover:text-stone-300">All notes</Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {NOTES.map((n, i) => (
            <Reveal key={n.slug} delay={i * 60}>
              <Link to={`/notes#${n.slug}`} className="group block">
                <p className="label">{n.date} · {n.minutes} min</p>
                <h3 className="mt-3 text-lg font-medium leading-snug text-stone-300 transition-colors duration-300 group-hover:text-white">
                  {n.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Contact</h2>
            <h2 className="mt-10 text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-white md:text-[3.5rem]">
              Tell me what
              <br />
              needs <span className="font-display text-grad font-normal italic">building</span>.
            </h2>
            <p className="mt-7 text-base leading-relaxed text-stone-400">
              Servers, plugins, panels, storefronts — anything with a live user base attached. I reply to every
              message within a day.
            </p>
            <div className="mt-12 space-y-3">
              <a href={`mailto:${CONTACTS.email}`} className="link block text-lg text-white transition-colors hover:text-violet-300">
                {CONTACTS.email}
              </a>
              <a href={CONTACTS.discord.href} target="_blank" rel="noreferrer" className="link block text-sm text-stone-500 transition-colors hover:text-white">
                Discord — {CONTACTS.discord.label}
              </a>
              <a href={CONTACTS.whatsapp.href} target="_blank" rel="noreferrer" className="link block text-sm text-stone-500 transition-colors hover:text-white">
                WhatsApp
              </a>
              <a href={CONTACTS.github.href} target="_blank" rel="noreferrer" className="link block text-sm text-stone-500 transition-colors hover:text-white">
                GitHub — {CONTACTS.github.label}
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ onPick }: { onPick: (p: Project) => void }) {
  return (
    <main>
      <Hero />
      <Roles />
      <Work onPick={onPick} />
      <Notes />
      <Contact />
    </main>
  );
}
