import { useEffect, useState } from 'react';

const LINES = ['Connecting to workspace', 'Loading project index', 'All systems nominal'];

export function BootLoader({ done }: { done: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setShown(i + 1), 240 + i * 240));
    });
    timers.push(
      setTimeout(() => {
        setLeaving(true);
        document.body.style.overflow = '';
      }, 1200),
    );
    timers.push(setTimeout(done, 1600));
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, [done]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0b] transition-all duration-500 ${
        leaving ? '-translate-y-3 opacity-0' : 'opacity-100'
      }`}
    >
      <img src="/logo.svg" alt="" className="h-16 w-16 rounded-2xl border border-white/12" />
      <p className="mt-7 font-display text-3xl italic text-white">
        Yuno<span className="text-stone-600">.</span>
      </p>
      <div className="mt-6 h-16 text-xs text-stone-600">
        {LINES.slice(0, shown).map((l) => (
          <p key={l} className="anim-fade py-0.5">
            {l}
          </p>
        ))}
      </div>
      <div className="mt-3 h-px w-48 overflow-hidden bg-white/10">
        <div className="boot-bar h-full bg-white/70" />
      </div>
    </div>
  );
}
