import { useEffect, useState } from 'react';

const LINES = ['$ strenox --boot', '✓ hosting … online', '✓ plugins … online', '✓ firewall … online'];

export function BootLoader({ done }: { done: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setShown(i + 1), 200 + i * 220));
    });
    timers.push(
      setTimeout(() => {
        setLeaving(true);
        document.body.style.overflow = '';
      }, 1250),
    );
    timers.push(setTimeout(done, 1650));
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, [done]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0a09] transition-all duration-500 ${
        leaving ? '-translate-y-4 opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <div className="absolute -inset-3 animate-ping rounded-[1.8rem] border border-lime-500/30" />
        <img src="/logo.svg" alt="" className="relative h-20 w-20 rounded-3xl border border-lime-500/40" />
      </div>
      <p className="mt-6 font-mono text-sm font-bold tracking-[0.3em] text-white">
        YUNO<span className="text-lime-400">_</span>
      </p>
      <div className="mt-5 h-20 font-mono text-xs leading-relaxed text-stone-500">
        {LINES.slice(0, shown).map((l) => (
          <p key={l} className="anim-fade">
            {l.startsWith('✓') ? <span className="text-lime-400">{l}</span> : <span className="text-stone-300">{l}</span>}
          </p>
        ))}
      </div>
      <div className="mt-2 h-1 w-52 overflow-hidden rounded-full bg-white/10">
        <div className="boot-bar h-full rounded-full bg-lime-500 shadow-[0_0_12px_rgba(132,204,22,0.9)]" />
      </div>
    </div>
  );
}
