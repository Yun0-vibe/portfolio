import { useState } from 'react';
import { SendIcon, CheckCircleIcon, AlertIcon } from '../components/icons';

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

  const field = 'w-full border-b border-white/15 bg-transparent pb-3 pt-2 text-sm text-white outline-none transition-colors placeholder:text-stone-700 focus:border-white/50';

  return (
    <form onSubmit={submit} className="rule-b pb-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="label">Name</span>
          <input className={`${field} mt-3`} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} />
        </label>
        <label className="block">
          <span className="label">Email</span>
          <input className={`${field} mt-3`} placeholder="you@company.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
      </div>
      <label className="mt-8 block">
        <span className="label">Project</span>
        <textarea
          className={`${field} mt-3 min-h-28 resize-y`}
          placeholder="What are you building? Scope, budget and timeline help."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={4000}
        />
      </label>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          disabled={state === 'sending'}
          className="inline-flex items-center gap-2.5 border border-white/15 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-200 disabled:opacity-50"
        >
          <SendIcon size={15} />
          {state === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {state === 'done' && (
          <p className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircleIcon size={15} /> {msg}
          </p>
        )}
        {state === 'error' && (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <AlertIcon size={15} /> {msg}
          </p>
        )}
      </div>
    </form>
  );
}
