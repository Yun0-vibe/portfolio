import { useState } from 'react';
import { SendIcon, CheckCircleIcon, AlertIcon, MessagePlusIcon } from '../components/icons';

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to send');
      setState('done');
      setMsg(data.message || 'Message received.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setState('error');
      setMsg(err instanceof Error ? err.message : 'Failed to send');
    }
  }

  const input =
    'w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-stone-600 focus:border-purple-400';

  return (
    <form onSubmit={submit} className="border-t border-white/10 pt-8">
      <p className="text-[11px] uppercase tracking-[0.25em] text-stone-600">New enquiry</p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.2em] text-stone-600">Name</span>
          <input className={`${input} mt-2`} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.2em] text-stone-600">Email</span>
          <input className={`${input} mt-2`} placeholder="you@company.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
      </div>
      <label className="mt-8 block">
        <span className="text-[11px] uppercase tracking-[0.2em] text-stone-600">Project</span>
        <textarea
          className={`${input} mt-2 min-h-32 resize-y`}
          placeholder="What are you building? Scope, budget and timeline help."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={4000}
        />
      </label>
      <button
        disabled={state === 'sending'}
        className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-purple-200 disabled:opacity-50"
      >
        <SendIcon size={15} />
        {state === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
      {state === 'done' && (
        <p className="mt-4 flex items-center gap-2 text-sm text-purple-300">
          <CheckCircleIcon size={15} /> {msg}
        </p>
      )}
      {state === 'error' && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
          <AlertIcon size={15} /> {msg}
        </p>
      )}
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
    <div className="border-t border-white/10 pt-8">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
        <MessagePlusIcon size={15} className="text-purple-400" /> Guestbook
      </h3>
      <p className="mt-1.5 text-sm text-stone-500">Leave a note — stored in your browser, no account needed.</p>
      <form onSubmit={add} className="mt-5 flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="border-b border-white/15 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-stone-600 focus:border-purple-400"
          maxLength={40}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="a word about the work…"
          className="border-b border-white/15 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-stone-600 focus:border-purple-400"
          maxLength={280}
        />
        <button className="w-fit border-b border-white/20 pb-1 text-sm font-semibold text-stone-200 transition-colors hover:border-purple-400 hover:text-purple-300">
          Sign
        </button>
      </form>
      <div className="mt-6 space-y-3">
        {entries.length === 0 && <p className="text-sm text-stone-600">No signatures yet — be the first.</p>}
        {entries.map((g, i) => (
          <div key={i} className="border-l border-white/10 pl-4 text-sm">
            <span className="font-semibold text-purple-300">{g.name}</span>{' '}
            <span className="text-stone-400">— {g.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
