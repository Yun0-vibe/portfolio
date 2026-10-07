import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquarePlus } from 'lucide-react';

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
      setMsg(data.message || 'Message received!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setState('error');
      setMsg(err instanceof Error ? err.message : 'Failed to send');
    }
  }

  const input =
    'w-full rounded-xl border border-stone-900/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-lime-700 dark:border-white/15';

  return (
    <form onSubmit={submit} className="rounded-3xl border border-stone-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="grid gap-3 sm:grid-cols-2">
        <input className={input} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} />
        <input className={input} placeholder="you@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <textarea
        className={`${input} mt-3 min-h-32`}
        placeholder="What do you want to build? Budget + timeline helps."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        maxLength={4000}
      />
      <button
        disabled={state === 'sending'}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-700 px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Send size={15} /> {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {state === 'done' && (
        <p className="mt-3 flex items-center gap-2 text-sm text-lime-700 dark:text-lime-400">
          <CheckCircle2 size={15} /> {msg}
        </p>
      )}
      {state === 'error' && (
        <p className="mt-3 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={15} /> {msg}
        </p>
      )}
      <p className="mt-3 font-mono text-[11px] text-stone-400">Powered by a Vercel serverless function — no backend server to keep awake.</p>
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
    <div className="rounded-3xl border border-stone-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
      <h3 className="flex items-center gap-2 text-lg font-bold">
        <MessageSquarePlus size={18} /> Guestbook
      </h3>
      <p className="mt-1 text-sm text-stone-500">Say hi — stored in your browser, no account needed.</p>
      <form onSubmit={add} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="rounded-xl border border-stone-900/15 bg-transparent px-3 py-2 text-sm outline-none sm:w-32 dark:border-white/15"
          maxLength={40}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="loved the XShop breakdown…"
          className="flex-1 rounded-xl border border-stone-900/15 bg-transparent px-3 py-2 text-sm outline-none dark:border-white/15"
          maxLength={280}
        />
        <button className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-stone-900">Sign</button>
      </form>
      <div className="mt-4 space-y-2">
        {entries.length === 0 && <p className="font-mono text-xs text-stone-400">No signatures yet — be the first.</p>}
        {entries.map((g, i) => (
          <div key={i} className="rounded-xl bg-stone-900/[0.04] px-3 py-2 text-sm dark:bg-white/5">
            <span className="font-bold">{g.name}</span> <span className="text-stone-500">· {g.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
