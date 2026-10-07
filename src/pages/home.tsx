import { Link } from 'react-router-dom';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon, BotIcon, GlobeIcon, GamepadIcon, SparklesIcon, CpuIcon } from '../components/icons';
import { PROJECTS, STACK_GROUPS, JOURNEY, SERVICES, NOTES, CONTACTS, FOUNDATION } from '../data';
import { Section } from '../components/section';
import { Reveal, CountUp, Typewriter } from '../components/reveal';
import { SelectedWork } from '../components/projects';
import { ContactForm, Guestbook } from '../components/forms';
import type { Project } from '../data';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  globe: <GlobeIcon size={18} />,
  bot: <BotIcon size={18} />,
  gamepad: <GamepadIcon size={18} />,
  sparkles: <SparklesIcon size={18} />,
};

const TICKER = ['GO', 'JAVA 21', 'TYPESCRIPT', 'REACT', 'FASTAPI', 'PAPER API', 'eBPF/XDP', 'DOCKER', 'POSTGRES', 'TAILWIND', 'GRADLE', 'NGINX'];

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="blob blob-drift left-[-140px] top-[-100px] h-96 w-96 bg-lime-500/15" />
      <div className="blob blob-drift-slow right-[-120px] top-40 h-80 w-80 bg-red-600/10" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-32 sm:pt-36 md:pt-40 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="anim-rise flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-lime-300">
              ● CEO — Strenox Foundation
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-stone-400">open for work</span>
          </div>
          <h1 className="anim-rise mt-6 text-5xl font-extrabold leading-[0.95] tracking-tighter text-white sm:text-6xl md:text-8xl" style={{ animationDelay: '90ms' }}>
            Hi, I'm Arjan.
            <br />
            I ship <span className="font-display glow-text font-normal italic text-lime-400">systems</span> that stay up.
          </h1>
          <p className="anim-rise mt-5 max-w-xl text-base leading-relaxed text-stone-400 md:text-lg" style={{ animationDelay: '180ms' }}>
            Arjan Subedi (aka Yuno) — 17-year-old CEO running <strong className="text-white">StrenoxCloud Hosting</strong>,{' '}
            <strong className="text-white">StrenoxDevelopment</strong> and the upcoming{' '}
            <strong className="text-white">StrenoxMC</strong> — firewalls, plugins, panels, bots.
          </p>
          <div className="anim-rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: '270ms' }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-lime-500 px-6 py-3 font-mono text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:bg-lime-400 hover:shadow-[0_0_30px_-6px_rgba(132,204,22,0.7)]"
            >
              ~/view-work <ArrowRightIcon size={15} />
            </Link>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-mono text-sm font-bold text-white transition-colors hover:border-lime-500/50 hover:text-lime-300"
            >
              contact.init <ArrowDownIcon size={15} />
            </a>
          </div>
          <dl className="anim-rise mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ animationDelay: '360ms' }}>
            <div className="card rounded-2xl p-4">
              <dt className="font-display text-3xl italic text-white">
                <CountUp to={PROJECTS.length} />
              </dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-stone-500">builds shipped</dd>
            </div>
            <div className="card rounded-2xl p-4">
              <dt className="font-display text-3xl italic text-white">
                <CountUp to={461} />+
              </dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-stone-500">tests passing</dd>
            </div>
            <div className="card rounded-2xl p-4">
              <dt className="font-display text-3xl italic text-white">10M+</dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-stone-500">pps firewall target</dd>
            </div>
            <div className="card rounded-2xl p-4">
              <dt className="font-display text-3xl italic text-white">3</dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-stone-500">companies, one ceo</dd>
            </div>
          </dl>
        </div>

        <div className="anim-rise lg:col-span-2" style={{ animationDelay: '250ms' }}>
          <div className="anim-float relative mx-auto w-fit">
            <div className="absolute -inset-4 rounded-[2rem] bg-lime-500/20 blur-2xl" />
            <img
              src="/avatar.png"
              alt="Yuno — Strenox Foundation"
              fetchPriority="high"
              decoding="async"
              className="relative h-52 w-52 rounded-[2rem] border border-lime-500/40 object-cover sm:h-64 sm:w-64"
            />
            <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-3 py-1.5 font-mono text-[11px] text-lime-300 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" /> systems nominal
            </div>
          </div>
          <div className="card mx-auto mt-8 max-w-sm rounded-2xl p-4 font-mono text-[13px] leading-relaxed">
            <div className="flex items-center gap-1.5 border-b border-white/[0.07] pb-2 text-stone-500">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime-500/70" />
              <span className="ml-2 text-xs">yuno@strenox: ~</span>
            </div>
            <div className="space-y-1.5 pt-3">
              <p><span className="text-lime-400">$</span> <span className="text-stone-300">whoami</span></p>
              <p className="text-stone-500">arjan subedi — ceo</p>
              <p><span className="text-lime-400">$</span> <span className="text-stone-300">uptime --servers</span></p>
              <p className="text-stone-500">all nodes <span className="text-lime-300">operational</span></p>
              <p><span className="text-lime-400">$</span> <span className="text-stone-300">cat critics.txt</span></p>
              <p className="text-stone-500">"vibe coders know nothing" <span className="text-stone-600">— people who ship nothing</span></p>
              <p><span className="text-lime-400">$</span> <span className="text-stone-300">./prove_them_wrong --production</span></p>
              <p className="text-stone-500">✓ {PROJECTS.length} builds shipped · <span className="text-lime-300">461 tests passing</span></p>
              <p><span className="text-lime-400">$</span> <span className="text-stone-300"><Typewriter text="sleep? never-heard-of-it" delay={1400} /></span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/[0.07] bg-black/50 py-3">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap font-mono text-xs tracking-[0.2em] text-stone-500">
                {t} <span className="text-lime-500">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePage({ onPick }: { onPick: (p: Project) => void }) {
  return (
    <main>
      <Hero />

      <Section kicker="selected-work" title={<>Recent builds<span className="text-lime-400">.</span></>} blurb="Flagship first. The full archive has search, filters and case files.">
        <Reveal>
          <SelectedWork onPick={onPick} />
        </Reveal>
      </Section>

      <div className="border-y border-white/[0.07] bg-black/60">
        <Section
          kicker="strenox-foundation"
          title={<>One foundation<span className="text-lime-400">, three missions.</span></>}
          blurb="I'm the CEO. Everything ships under Strenox — AeroVibe Studio is officially retired."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {FOUNDATION.map((f, i) => (
              <Reveal key={f.name} delay={(i % 3) * 90}>
              <div className="card card-hover h-full rounded-2xl p-6">
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold ${
                    f.status === 'Live'
                      ? 'bg-lime-500/15 text-lime-300'
                      : f.status === 'Active'
                        ? 'bg-sky-500/15 text-sky-300'
                        : 'border border-dashed border-amber-500/40 text-amber-300'
                  }`}
                >
                  ● {f.status}
                </span>
                <h3 className="mt-4 flex items-center gap-2 text-xl font-bold text-white">
                  <CpuIcon size={18} className="text-lime-400" /> {f.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{f.text}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <Section
        kicker="services"
        title={<>Hire the foundation<span className="text-lime-400">.</span></>}
        blurb="Fixed-scope builds with clear pricing. Message me for anything in between."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 90}>
            <div className="card card-hover h-full rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="rounded-xl border border-lime-500/25 bg-lime-500/10 p-2.5 text-lime-300">{SERVICE_ICONS[s.icon]}</span>
                <span className="ml-auto font-mono text-xs text-stone-500">{s.price}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-400">{s.text}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="border-y border-white/[0.07] bg-black/60">
        <Section kicker="stack" title={<>Arsenal<span className="text-lime-400">.</span></>} blurb="Grouped by job. Every entry has shipped something real.">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {STACK_GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={(i % 4) * 80}>
              <div className="card h-full rounded-2xl p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-stone-500">~/ {g.title}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-stone-300 transition-colors hover:border-lime-500/50 hover:text-lime-300">
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

      <Section kicker="journey" title={<>How I got here<span className="text-lime-400">.</span></>}>
        <Reveal>
          <ol className="relative ml-2 space-y-6 border-l-2 border-white/10 pl-6">
            {JOURNEY.map((j) => (
              <li key={j.title} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-lime-500 shadow-[0_0_12px_rgba(132,204,22,0.9)] ring-4 ring-[#0c0a09]" />
                <p className="font-mono text-xs uppercase tracking-widest text-lime-400">{j.period}</p>
                <h3 className="mt-1 text-xl font-bold text-white">{j.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-400">{j.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <div className="border-y border-white/[0.07] bg-black/60">
        <Section kicker="notes" title={<>Field logs<span className="text-lime-400">.</span></>} blurb="Short, practical write-ups. Full reader on the Notes page.">
          <div className="grid gap-4 md:grid-cols-3">
            {NOTES.map((n, i) => (
              <Reveal key={n.slug} delay={(i % 3) * 90}>
              <Link to={`/notes#${n.slug}`} className="card card-hover group block h-full rounded-2xl p-5">
                <p className="font-mono text-[11px] text-stone-500">
                  {n.date} · {n.minutes} min
                </p>
                <h3 className="mt-2 font-bold leading-snug text-white group-hover:text-lime-300">{n.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-stone-500">{n.body[0]}</p>
              </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <Section
        kicker="contact"
        title={<>Open a channel<span className="font-display font-normal italic text-lime-400">.</span></>}
        blurb="Tell me about your server, store, bot or idea. I usually reply within a day."
      >
        <div id="contact" className="grid scroll-mt-28 gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>
          <div className="space-y-4 lg:col-span-2">
            <div className="card rounded-3xl p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-stone-500">Direct channels</p>
              <div className="mt-3 space-y-2 font-mono text-sm">
                <a className="block text-stone-300 transition-colors hover:text-lime-300" href={`mailto:${CONTACTS.email}`}>
                  <strong className="text-white">email</strong> — {CONTACTS.email}
                </a>
                <a className="block text-stone-300 transition-colors hover:text-lime-300" href={CONTACTS.discord.href} target="_blank" rel="noreferrer">
                  <strong className="text-white">discord</strong> — {CONTACTS.discord.label}
                </a>
                <a className="block text-stone-300 transition-colors hover:text-lime-300" href={CONTACTS.whatsapp.href} target="_blank" rel="noreferrer">
                  <strong className="text-white">whatsapp</strong> — chat
                </a>
                <a className="flex items-center gap-1 text-stone-300 transition-colors hover:text-lime-300" href={CONTACTS.github.href} target="_blank" rel="noreferrer">
                  <strong className="text-white">github</strong> — {CONTACTS.github.label} <ArrowUpRightIcon size={13} />
                </a>
              </div>
            </div>
            <Guestbook />
          </div>
        </div>
      </Section>
    </main>
  );
}
