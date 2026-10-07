import { useState } from 'react';
import { SendIcon, CheckCircleIcon, AlertIcon, MessagePlusIcon, TerminalIcon } from './icons';

const INBOXES = ['mrgoblinsir@gmail.com', 'rznsenseii@gmail.com'];

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    setMsg('');
    try {
      const sends = INBOXES.map((to) =>
        fetch(`https://formsubmit.co/ajax/${to}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `New portfolio contact from ${name}`,
            _template: 'table',
            _replyto: email,
          }),
        })
          .then((r) => r.ok)
          .catch(() => false),
      );
      const results = await Promise.all(sends);
      if (results.every((ok) => !ok)) {
        // fallback: site backend (logs + optional webhook)
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to send');
        setMsg(data.message || 'Message received!');
      } else {
        setMsg(`Thanks ${name}! Your message is on its way to my inbox.`);
      }
      setState('done');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setState('error');
      setMsg(err instanceof Error ? err.message : 'Failed to send');
    }
  }

  const input =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-sm text-white outline-none transition-colors placeholder:text-stone-600 focus:border-lime-500/60';

  return (
    <form onSubmit={submit} className="card rounded-3xl p-6">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-500">
        <TerminalIcon size={13} className="text-lime-400" /> new_transmission
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input className={input} placeholder="your_name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} />
        <input className={input} placeholder="you@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <textarea
        className={`${input} mt-3 min-h-32`}
        placeholder="mission briefing: what are we building? budget + timeline helps."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        maxLength={4000}
      />
      <button
        disabled={state === 'sending'}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-500 px-5 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-lime-400 disabled:opacity-50"
      >
        <SendIcon size={15} /> {state === 'sending' ? 'transmitting…' : './send_message'}
      </button>
      {state === 'done' && (
        <p className="mt-3 flex items-center gap-2 font-mono text-sm text-lime-300">
          <CheckCircleIcon size={15} /> {msg}
        </p>
      )}
      {state === 'error' && (
        <p className="mt-3 flex items-center gap-2 font-mono text-sm text-red-400">
          <AlertIcon size={15} /> {msg}
        </p>
      )}
      <p className="mt-3 font-mono text-[11px] text-stone-600">delivered straight to my inbox — I reply within a day.</p>
    </form>
  );
}

type Entry = { name: string; text: string; at: string };

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('yuno-guestbook') || '[]');
    } catch {
      return [];
    }
  });
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const next = [{ name: name.trim().slice(0, 40), text: text.trim().slice(0, 280), at: new Date().toISOString() }, ...entries].slice(0, 20);
    setEntries(next);
    localStorage.setItem('yuno-guestbook', JSON.stringify(next));
    setName('');
    setText('');
  }

  return (
    <div className="card rounded-3xl p-6">
      <h3 className="flex items-center gap-2 font-mono text-sm font-bold text-white">
        <MessagePlusIcon size={16} className="text-lime-400" /> guestbook.log
      </h3>
      <p className="mt-1 font-mono text-xs text-stone-500">say hi — stored in your browser, no account needed.</p>
      <form onSubmit={add} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-sm text-white outline-none placeholder:text-stone-600 sm:w-32"
          maxLength={40}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="loved the firewall breakdown…"
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-sm text-white outline-none placeholder:text-stone-600"
          maxLength={280}
        />
        <button className="rounded-xl bg-lime-500 px-4 py-2 font-mono text-sm font-bold text-black transition-colors hover:bg-lime-400">sign</button>
      </form>
      <div className="mt-4 space-y-2">
        {entries.length === 0 && <p className="font-mono text-xs text-stone-600">-- empty log. be the first entry.</p>}
        {entries.map((g, i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 font-mono text-[13px]">
            <span className="font-bold text-lime-300">{g.name}</span> <span className="text-stone-400">· {g.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
