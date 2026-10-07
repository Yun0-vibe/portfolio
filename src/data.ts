export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  category: 'Web' | 'Game Panel' | 'Plugin' | 'Bot' | 'Platform' | 'Store';
  status: 'Ongoing' | 'Finished';
  year: string;
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'aerodactyl',
    title: 'Aerodactyl',
    tagline: 'Custom game server management panel',
    description:
      'Ongoing build: a full management panel for game servers with server controls, user roles, billing hooks and Docker-backed deploys. Designed to replace generic panels with something faster and game-specific.',
    stack: ['PHP', 'React', 'Node.js', 'Docker'],
    category: 'Game Panel',
    status: 'Ongoing',
    year: '2025 — now',
    accent: '#65a30d',
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
    slug: 'nvch-platform',
    title: 'NVCH Team Platform',
    tagline: 'Multilingual team & community platform',
    description:
      'Multilingual web platform for a team: news, rosters, applications and internal tools. PHP + MySQL with a Tailwind frontend.',
    stack: ['PHP', 'Tailwind CSS', 'MySQL'],
    category: 'Platform',
    status: 'Finished',
    year: '2023',
    accent: '#0e7490',
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
  { title: 'Languages', items: ['TypeScript', 'Java', 'Python', 'PHP', 'C', 'QBasic'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'MySQL'] },
  { title: 'Infra', items: ['Vercel', 'Pterodactyl', 'Nginx', 'Oracle Cloud', 'AWS & GCP', 'Git & GitHub'] },
];

export const JOURNEY = [
  {
    period: 'Now',
    title: 'Architect & Prompter',
    text: 'Shipping full products with AI-assisted workflows: panels, bots, stores and plugins. Focus on systems that stay up, not demos that break.',
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
      'Aerodactyl exists because generic panels fought me. I wanted per-server controls, clear roles, and Docker underneath so a crash in one container never takes the node down.',
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
  discord: { label: 'darkwiz.vibe', href: 'https://discordapp.com/users/darkwiz.vibe' },
  whatsapp: { label: 'vibeyuno.dev', href: 'https://wa.me/vibeyuno.dev' },
  github: { label: 'Yun0-vibe', href: 'https://github.com/Yun0-vibe' },
};
