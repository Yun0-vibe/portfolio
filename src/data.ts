export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  category: 'Web' | 'Plugin' | 'Security' | 'Infra' | 'Bot' | 'Store';
  status: 'Ongoing' | 'Finished';
  year: string;
  accent: string;
  links?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'strenox-migration',
    title: 'Strenox DDoS Migration',
    tagline: 'XDP-based DDoS mitigation firewall (formerly AeroDDoS)',
    description:
      'Attaches to the network interface at the driver level and makes drop/pass decisions before the kernel allocates an SKB — targeting 10M+ pps on a single core. 16-stage XDP pipeline, multi-vector detection (SYN/UDP/ICMP/amplification), bubbletea TUI dashboard, Prometheus metrics, Discord/Slack alerts — plus a companion attack-simulation tester.',
    stack: ['Go', 'eBPF/XDP', 'C', 'Prometheus'],
    category: 'Security',
    status: 'Ongoing',
    year: '2026',
    accent: '#dc2626',
  },
  {
    slug: 'strenoxcloud',
    title: 'StrenoxCloud',
    tagline: 'Game-hosting cloud platform',
    description:
      'Custom hosting cloud built from scratch: React dashboard, FastAPI + PostgreSQL backend with 461 tests, Dockerized production compose, Nginx edge, and billing through a Paymenter extension. The flagship infra of Strenox Foundation.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Docker'],
    category: 'Infra',
    status: 'Ongoing',
    year: '2026',
    accent: '#2563eb',
    links: [
      { label: 'strenoxcloud.xyz', href: 'https://www.strenoxcloud.xyz' },
      { label: 'discord', href: 'https://dsc.gg/strenoxcloud' },
    ],
  },
  {
    slug: 'playertales',
    title: 'PlayerTales',
    tagline: 'Auto-generated player storybooks (Paper 1.20+)',
    description:
      'Tracks 10+ player action types — joins, movement, chat, mining, kills, deaths, crafting — and turns them into readable storybooks with milestone GUIs. MySQL (HikariCP) + YAML storage, PlaceholderAPI expansion, LuckPerms/Vault hooks, Discord webhooks, and a full MockBukkit + JUnit test suite. By StrenoxDevelopment.',
    stack: ['Java', 'Paper API', 'MySQL', 'MockBukkit'],
    category: 'Plugin',
    status: 'Finished',
    year: '2026',
    accent: '#65a30d',
  },
  {
    slug: 'serverpulse',
    title: 'ServerPulse',
    tagline: 'Automated player engagement engine (Paper 1.20+)',
    description:
      'Monitors live server activity with snapshots and configurable triggers, then auto-launches re-engagement events when activity drops. Pulse dashboard + event-config GUIs, PlaceholderAPI expansion, Discord alerts, and MockBukkit integration tests. By StrenoxDevelopment.',
    stack: ['Java', 'Paper API', 'PlaceholderAPI', 'MockBukkit'],
    category: 'Plugin',
    status: 'Finished',
    year: '2026',
    accent: '#0d9488',
  },
  {
    slug: 'battlepass-live',
    title: 'BattlePass Live',
    tagline: 'Seasons, tiers & quests battle pass (Paper 1.21)',
    description:
      'Full battle-pass system: seasons, free/premium tiers, quest engine, in-game admin editors for tiers/quests/seasons/messages, SQLite storage, Vault economy rewards, Geyser Bedrock forms, Discord integration and a developer API. Built with Gradle on Java 21 for StrenoxDevelopment.',
    stack: ['Java', 'Paper API', 'Gradle', 'SQLite'],
    category: 'Plugin',
    status: 'Ongoing',
    year: '2026',
    accent: '#C2410C',
  },
  {
    slug: 'axemc-license',
    title: 'AxeMC License',
    tagline: 'License management system for Minecraft products',
    description:
      'License key issuance, validation API and revocation dashboard for premium Minecraft resources. Built to survive key leaks with HWID-style checks and MySQL-backed audit logs.',
    stack: ['Java', 'API', 'MySQL'],
    category: 'Plugin',
    status: 'Finished',
    year: '2024',
    accent: '#C2410C',
  },
  {
    slug: 'hosting-dashboard',
    title: 'Hosting Dashboard',
    tagline: 'Client dashboard for a game hosting brand',
    description:
      'Customer-facing dashboard: order tracking, service controls, invoices and support tickets. Clean React frontend on a Node API with Tailwind throughout.',
    stack: ['React', 'Node.js', 'Tailwind'],
    category: 'Web',
    status: 'Finished',
    year: '2024',
    accent: '#0d9488',
  },
  {
    slug: 'veltrix-store',
    title: 'Veltrix Store',
    tagline: 'Digital storefront',
    description:
      'Storefront for digital goods with product pages, checkout flow and order management. Built with Next.js and TypeScript for speed and SEO.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    category: 'Store',
    status: 'Finished',
    year: '2024',
    accent: '#4f46e5',
  },
  {
    slug: 'xshop-plugin',
    title: 'XShop Plugin',
    tagline: 'Modular economy & auction plugin (1.18+ Paper/Spigot)',
    description:
      'Modular economy and auction-house plugin for Paper/Spigot 1.18+. Shops, auctions, and admin tools backed by MySQL, written for performance on large servers.',
    stack: ['Java', 'Spigot API', 'MySQL'],
    category: 'Plugin',
    status: 'Finished',
    year: '2023',
    accent: '#b45309',
  },
  {
    slug: 'xnova-bot',
    title: 'XNova Community Bot',
    tagline: 'Discord community automation',
    description:
      'Moderation, leveling, tickets and custom commands for a gaming community. Discord.js with MongoDB persistence and a modular command handler.',
    stack: ['Node.js', 'Discord.js', 'MongoDB'],
    category: 'Bot',
    status: 'Finished',
    year: '2023',
    accent: '#5865F2',
  },
  {
    slug: 'minor-webs',
    title: 'Minor Webs & Products',
    tagline: 'Experiments, landing pages and small tools',
    description:
      'A collection of smaller websites, landing pages and experiments — HTML/CSS/JS and Firebase. Where new ideas get tested fast.',
    stack: ['HTML', 'CSS', 'JS', 'Firebase'],
    category: 'Web',
    status: 'Finished',
    year: '2022 — now',
    accent: '#64748b',
  },
];

export const STACK_GROUPS: { title: string; items: string[] }[] = [
  { title: 'Languages', items: ['TypeScript', 'Java', 'Go', 'Python', 'PHP', 'C', 'QBasic'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'MySQL'] },
  { title: 'Infra', items: ['Vercel', 'Pterodactyl', 'Nginx', 'Oracle Cloud', 'AWS & GCP', 'Git & GitHub'] },
];

export const JOURNEY = [
  {
    period: 'Now',
    title: 'CEO — Strenox Foundation',
    text: 'Running the parent company behind StrenoxCloud Hosting, StrenoxDevelopment Studio and the upcoming StrenoxMC server. AeroVibe Studio officially shut down — everything merged into Strenox.',
  },
  {
    period: 'A year ago',
    title: 'Multi-lingual deep dive',
    text: 'Went wide on purpose: Java plugins, PHP platforms, Node bots, React frontends. Learned how each ecosystem deploys and fails.',
  },
  {
    period: 'The beginning',
    title: 'Hello World',
    text: 'Started with QBasic and plain HTML/CSS/JS. Fell in love with making things that other people actually use.',
  },
];

export const FOUNDATION = [
  {
    name: 'StrenoxCloud Hosting',
    status: 'Live',
    text: 'Game-server hosting cloud — custom panel, billing and nodes, built from scratch.',
  },
  {
    name: 'StrenoxDevelopment',
    status: 'Active',
    text: 'Dev studio — Minecraft plugins, panels, firewalls and license infrastructure.',
  },
  {
    name: 'StrenoxMC',
    status: 'Upcoming',
    text: 'Community Minecraft server — currently in the works. Watch this space.',
  },
];

export const SERVICES = [
  {
    title: 'Web builds',
    price: 'from $80',
    text: 'Landing pages, dashboards and stores. React / Next.js + Tailwind, deployed on Vercel.',
    icon: 'globe',
  },
  {
    title: 'Discord & automation bots',
    price: 'from $50',
    text: 'Moderation, tickets, leveling and custom integrations with Node.js + MongoDB.',
    icon: 'bot',
  },
  {
    title: 'Minecraft plugins & infra',
    price: 'from $60',
    text: 'Spigot/Paper plugins, license systems and Pterodactyl game-server setup.',
    icon: 'gamepad',
  },
  {
    title: 'AI-assisted prototyping',
    price: 'from $40',
    text: 'Idea to working prototype in days: prompt engineering, scaffolding and iteration.',
    icon: 'sparkles',
  },
];

export type Note = { slug: string; title: string; date: string; minutes: number; body: string[] };

export const NOTES: Note[] = [
  {
    slug: 'prompt-first',
    title: 'Prompt-first: how I ship faster without skipping quality',
    date: 'Jan 2026',
    minutes: 4,
    body: [
      'I start every build by writing the outcome in plain words: who uses it, what breaks today, what "done" looks like. That paragraph becomes the spec I prompt against.',
      'Then I build in thin slices — one working route, one command, one panel screen — and test each slice before adding the next. AI writes the draft, I review every diff like it owes me money.',
      'The rule that saves me: never let generated code you do not understand reach production. If I cannot explain it, I simplify it until I can.',
    ],
  },
  {
    slug: 'panel-lessons',
    title: 'What running game servers taught me about uptime',
    date: 'Dec 2025',
    minutes: 5,
    body: [
      'Game players notice downtime in seconds. That pressure taught me more than any tutorial: health checks, restarts, backups, and logs you actually read.',
      'I have run servers on Pterodactyl nodes long enough to learn what matters: per-server controls, clear roles, and Docker underneath so a crash in one container never takes the node down.',
      'If you host anything: pin your versions, back up the database separately from the files, and write the runbook before you need it at 2am.',
    ],
  },
  {
    slug: 'java-to-typescript',
    title: 'Going from Java plugins to TypeScript frontends',
    date: 'Nov 2025',
    minutes: 3,
    body: [
      'Java taught me types, lifecycle and caring about performance. TypeScript felt familiar — same discipline, faster feedback loop.',
      'The biggest shift was state: on the server you guard shared mutable state, in the browser you model UI state so it cannot represent impossible screens.',
      'My advice: learn one typed language properly, then every other stack is just new standard libraries.',
    ],
  },
];

export const CONTACTS = {
  email: 'contact@vibeyuno.me',
  discord: { label: 'yuno_vibe.exe', href: 'https://discordapp.com/users/darkwiz.vibe' },
  whatsapp: { label: 'vibeyuno.dev', href: 'https://wa.me/vibeyuno.dev' },
  github: { label: 'Yun0-vibe', href: 'https://github.com/Yun0-vibe' },
};
