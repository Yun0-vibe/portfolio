import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, MapPin, Bot, Globe, Gamepad2, Sparkles } from 'lucide-react';
import { PROJECTS, STACK_GROUPS, JOURNEY, SERVICES, NOTES, CONTACTS } from '../data';
import { useKathmanduTime } from '../hooks';
import { Section } from '../components/section';
import { Reveal, CountUp } from '../components/reveal';
import { SelectedWork } from '../components/projects';
import { ContactForm, Guestbook } from '../components/forms';
import type { Project } from '../data';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  globe: <Globe size={18} />,
  bot: <Bot size={18} />,
  gamepad: <Gamepad2 size={18} />,
  sparkles: <Sparkles size={18} />,
};

export function Hero() {
  const time = useKathmanduTime();
  return (
    <div className="paper-grid relative overflow-hidden border-b border-stone-900/10 dark:border-white/10">
      <div className="blob blob-drift left-[-120px] top-[-120px] h-80 w-80 bg-lime-500/20 dark:bg-lime-500/10" />
      <div className="blob blob-drift-slow right-[-100px] top-20 h-72 w-72 bg-orange-500/15 dark:bg-orange-500/10" />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 md:pt-20">
        <div className="anim-rise flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="flex items-center gap-1.5 rounded-full border border-stone-900/15 px-3 py-1 dark:border-white/15">
            <MapPin size={12} /> Kathmandu, Nepal — {time}
          </span>
          <span className="rounded-full bg-stone-900 px-3 py-1 text-white dark:bg-white dark:text-stone-900">available for freelance</span>
        </div>
        <h1 className="anim-rise mt-6 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tighter md:text-7xl" style={{ animationDelay: '90ms' }}>
          Hi, I'm Yuno.
          <br />
          I build <span className="font-display font-normal italic text-lime-700 dark:text-lime-400">software</span> that ships.
        </h1>
        <p className="anim-rise mt-5 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300" style={{ animationDelay: '180ms' }}>
          17-year-old developer & AI prompter into multi-lingual builds — game panels, Minecraft plugins, Discord bots and
          web platforms. Prompt-first, production-minded.
        </p>
        <div className="anim-rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: '270ms' }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-lime-700 px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Browse my work <ArrowRight size={15} />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-stone-900/20 px-6 py-3 text-sm font-bold transition-colors hover:bg-stone-900/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            Get in touch <ArrowDown size={15} />
          </a>
        </div>
        <dl className="anim-rise mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ animationDelay: '360ms' }}>
          <div className="rounded-2xl border border-stone-900/10 bg-white/70 p-4 transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.03]">
            <dt className="font-display text-3xl italic">
              <CountUp to={PROJECTS.length} />
            </dt>
            <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-stone-400">projects shipped</dd>
          </div>
          <div className="rounded-2xl border border-stone-900/10 bg-white/70 p-4 transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.03]">
            <dt className="font-display text-3xl italic">
              <CountUp to={19} />
            </dt>
            <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-stone-400">tools in stack</dd>
          </div>
          {[
            ['5+', 'languages used'],
            ['∞', 'ideas in backlog'],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-stone-900/10 bg-white/70 p-4 transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.03]">
              <dt className="font-display text-3xl italic">{n}</dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-stone-400">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function HomePage({ onPick }: { onPick: (p: Project) => void }) {
  return (
    <main>
      <Hero />

      <Section kicker="Selected work" title={<>Recent builds<span className="text-lime-700">.</span></>} blurb="A quick slice — the full archive has search, filters and detail views.">
        <Reveal>
          <SelectedWork onPick={onPick} />
        </Reveal>
      </Section>

      <div className="border-y border-stone-900/10 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
        <Section
          kicker="Services"
          title={<>What I can do for you<span className="text-lime-700">.</span></>}
          blurb="Fixed-scope builds with clear pricing. Message me for anything in between."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 90}>
              <div className="h-full rounded-2xl border border-stone-900/10 bg-paper p-5 transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-transparent">
                <div className="flex items-center gap-2">
                  <span className="rounded-xl bg-lime-700/10 p-2 text-lime-700 transition-transform hover:scale-110 dark:text-lime-400">{SERVICE_ICONS[s.icon]}</span>
                  <span className="ml-auto font-mono text-xs text-stone-400">{s.price}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">{s.text}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <Section kicker="Stack" title={<>Tools I reach for<span className="text-lime-700">.</span></>} blurb="Grouped by job, not a trophy wall. Nineteen entries, zero filler marquee.">
        <div className="grid gap-4 md:grid-cols-4">
          {STACK_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 4) * 80}>
            <div className="h-full rounded-2xl border border-stone-900/10 bg-white p-5 transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="font-mono text-xs uppercase tracking-widest text-stone-400">{g.title}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((t) => (
                  <span key={t} className="rounded-full bg-stone-900/5 px-2.5 py-1 text-xs font-medium transition-colors hover:bg-lime-700 hover:text-white dark:bg-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="border-y border-stone-900/10 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
        <Section kicker="Journey" title={<>How I got here<span className="text-lime-700">.</span></>}>
        <Reveal>
          <ol className="relative ml-2 space-y-6 border-l-2 border-stone-900/10 pl-6 dark:border-white/10">
            {JOURNEY.map((j) => (
              <li key={j.title} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-lime-600 ring-4 ring-paper dark:ring-[#0C0A09]" />
                <p className="font-mono text-xs uppercase tracking-widest text-lime-700 dark:text-lime-400">{j.period}</p>
                <h3 className="mt-1 text-xl font-bold">{j.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-500 dark:text-stone-400">{j.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        </Section>
      </div>

      <Section kicker="Notes" title={<>Things I've learned<span className="text-lime-700">.</span></>} blurb="Short, practical write-ups. Full reader on the Notes page.">
        <div className="grid gap-4 md:grid-cols-3">
          {NOTES.map((n, i) => (
            <Reveal key={n.slug} delay={(i % 3) * 90}>
            <Link to={`/notes#${n.slug}`} className="group block h-full rounded-2xl border border-stone-900/10 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]">
              <p className="font-mono text-[11px] text-stone-400">
                {n.date} · {n.minutes} min
              </p>
              <h3 className="mt-2 font-bold leading-snug group-hover:underline">{n.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-stone-500">{n.body[0]}</p>
            </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="border-t border-stone-900/10 dark:border-white/10">
        <Section
          kicker="Contact"
          title={<>Let's build something<span className="font-display font-normal italic text-lime-700 dark:text-lime-400"> together.</span></>}
          blurb="Tell me about your server, store, bot or idea. I usually reply within a day."
        >
          <div id="contact" className="grid scroll-mt-24 gap-4 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <ContactForm />
            </Reveal>
            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-3xl border border-stone-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="font-mono text-xs uppercase tracking-widest text-stone-400">Direct channels</p>
                <div className="mt-3 space-y-2 text-sm">
                  <a className="block hover:underline" href={`mailto:${CONTACTS.email}`}>
                    <strong>Email</strong> — {CONTACTS.email}
                  </a>
                  <a className="block hover:underline" href={CONTACTS.discord.href} target="_blank" rel="noreferrer">
                    <strong>Discord</strong> — {CONTACTS.discord.label}
                  </a>
                  <a className="block hover:underline" href={CONTACTS.whatsapp.href} target="_blank" rel="noreferrer">
                    <strong>WhatsApp</strong> — chat
                  </a>
                  <a className="block hover:underline" href={CONTACTS.github.href} target="_blank" rel="noreferrer">
                    <strong>GitHub</strong> — {CONTACTS.github.label}
                  </a>
                </div>
              </div>
              <Guestbook />
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
