/**
 * Hand-drawn icon set — original strokes, no stock icon font.
 * 24x24 viewBox, stroke = currentColor, round caps.
 */

type P = { size?: number; className?: string };

function base(size = 16, className = '') {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };
}

export const SearchIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.3 15.3 L20.5 20.5" strokeWidth={2.2} />
    <path d="M8 10.5h.01" strokeWidth={2.4} />
  </svg>
);

export const MenuIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4 7h16" />
    <path d="M7 12h13" />
    <path d="M4 17h16" />
  </svg>
);

export const CloseIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </svg>
);

export const ArrowUpIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 19V6" />
    <path d="M6.5 11.5L12 6l5.5 5.5" />
  </svg>
);

export const ArrowRightIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4.5 12h14" />
    <path d="M13.5 6.5L19 12l-5.5 5.5" />
  </svg>
);

export const ArrowUpRightIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M6.5 17.5L17.5 6.5" />
    <path d="M8.5 6.5h9v9" />
  </svg>
);

export const ArrowDownIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 5v13" />
    <path d="M6.5 12.5L12 18l5.5-5.5" />
  </svg>
);

export const ArrowLeftIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M19.5 12h-14" />
    <path d="M10.5 6.5L5 12l5.5 5.5" />
  </svg>
);

export const CopyIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
    <path d="M15.5 5.5v-1a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1" />
  </svg>
);

export const CheckIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4.5 12.5l5 5L19.5 7" strokeWidth={2.2} />
  </svg>
);

export const CheckCircleIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 12.2l2.6 2.6 4.6-5.4" />
  </svg>
);

export const AlertIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v5.5" strokeWidth={2.2} />
    <path d="M12 16.2h.01" strokeWidth={2.4} />
  </svg>
);

export const SendIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M20 4L10.5 13.5" />
    <path d="M20 4l-6.8 16-2.7-6.5L4 10.8 20 4z" />
  </svg>
);

export const MailIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M4.5 7.5L12 13l7.5-5.5" />
  </svg>
);

export const TerminalIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <rect x="3" y="4.5" width="18" height="15" rx="3" />
    <path d="M7.5 9.5l3 3-3 3" />
    <path d="M12.5 15.5H16" strokeWidth={2.2} />
  </svg>
);

export const CommandIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M9 9H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
    <rect x="14" y="4.5" width="6" height="6" rx="1.5" />
    <path d="M9 15.5h.01" strokeWidth={2.4} />
  </svg>
);

export const ClockIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3.2 2" />
  </svg>
);

export const CpuIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <rect x="10.5" y="10.5" width="3" height="3" rx="0.8" />
    <path d="M9.5 4v2M14.5 4v2M9.5 18v2M14.5 18v2M4 9.5h2M4 14.5h2M18 9.5h2M18 14.5h2" />
  </svg>
);

/* ------- services (the big visible ones) ------- */

export const GlobeIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="8.5" />
    <ellipse cx="12" cy="12" rx="3.8" ry="8.5" />
    <path d="M4.2 9.3c2.4 1.2 5 1.8 7.8 1.8s5.4-.6 7.8-1.8" />
    <path d="M4.2 14.8c2.4-1.2 5-1.9 7.8-1.9s5.4.7 7.8 1.9" />
  </svg>
);

export const BotIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <rect x="5" y="9" width="14" height="10" rx="3.5" />
    <path d="M12 9V5.5" />
    <circle cx="12" cy="4" r="1.3" />
    <circle cx="9.5" cy="13.2" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="13.2" r="1.2" fill="currentColor" stroke="none" />
    <path d="M9.5 16.3c1.6 1 3.4 1 5 0" />
    <path d="M2.5 12v3M21.5 12v3" />
  </svg>
);

export const GamepadIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M7 8.5h10a4.5 4.5 0 0 1 4.4 5.4l-.9 4.1a2.6 2.6 0 0 1-4.6 1L14.5 17h-5l-1.4 2a2.6 2.6 0 0 1-4.6-1l-.9-4.1A4.5 4.5 0 0 1 7 8.5z" />
    <path d="M8 12h2.5M9.2 10.7v2.6" />
    <circle cx="15.2" cy="11.6" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="17" cy="13.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const SparklesIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M11 4l1.7 4.6L17.5 10l-4.8 1.4L11 16l-1.7-4.6L4.5 10l4.8-1.4L11 4z" />
    <path d="M18 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />
    <path d="M5 16.5h.01" strokeWidth={2.4} />
  </svg>
);

/* ------- socials (original marks, not brand copies) ------- */

export const GithubIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2.6" />
    <circle cx="12" cy="5.6" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="17.6" cy="15.2" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="6.4" cy="15.2" r="1.1" fill="currentColor" stroke="none" />
    <path d="M12 8.2v-1.5M13.9 13.2l2.4 1.2M10.1 13.2l-2.4 1.2" />
  </svg>
);

export const DiscordIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M5 6h14a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-3l-2.2-2.4H9.5L7 18.5V8a2 2 0 0 1-2-2z" />
    <circle cx="9.7" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="14.6" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const WhatsappIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M12 4a7.5 7.5 0 0 0-6.4 11.4L4.5 19.5l4.2-1.1A7.5 7.5 0 1 0 12 4z" />
    <path d="M9 9.2c.3 2.6 3.2 5.5 5.8 5.8l1-1.4 2 1c-.3 1.5-1.2 2-2.3 1.7-3.4-.9-6.9-4.4-7.8-7.8-.3-1.1.2-2 1.7-2.3l1 2L9 9.2z" />
  </svg>
);

export const MessagePlusIcon = ({ size, className }: P) => (
  <svg {...base(size, className)}>
    <path d="M4.5 6.5h15v9h-8l-3.5 3v-3H4.5v-9z" />
    <path d="M18.5 4v4M16.5 6h4" />
  </svg>
);
