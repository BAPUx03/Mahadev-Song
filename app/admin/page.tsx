'use client';

import { FormEvent, useEffect, useState } from 'react';

type SessionState = 'checking' | 'login' | 'dashboard';

export default function AdminPage() {
  const [state, setState] = useState<SessionState>('checking');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/session').then((response) => setState(response.ok ? 'dashboard' : 'login')).catch(() => setState('login'));
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Checking credentials…');
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const result = await response.json();
    if (!response.ok) { setMessage(result.message ?? 'Unable to sign in.'); return; }
    setState('dashboard');
    setMessage('');
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setState('login');
    setPassword('');
  }

  if (state === 'checking') return <main className="admin-page grid min-h-dvh place-items-center bg-surface text-white/60">Loading admin space…</main>;

  if (state === 'login') return (
    <main className="admin-page grid min-h-dvh place-items-center bg-surface px-5 text-white">
      <form onSubmit={login} className="admin-card w-full max-w-md rounded-[28px] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl sm:p-9">
        <a href="/" className="text-xs uppercase tracking-[0.3em] text-accent">← Mahadev</a>
        <p className="mt-12 text-[10px] uppercase tracking-[0.28em] text-white/45">Private workspace</p>
        <h1 className="mt-3 font-serif text-4xl">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-white/55">Manage your listening room content and business presence.</p>
        <label className="mt-8 block text-xs text-white/60" htmlFor="admin-email">Email</label>
        <input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60" />
        <label className="mt-5 block text-xs text-white/60" htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60" />
        <button type="submit" className="mt-6 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01]">Sign in</button>
        {message && <p className="mt-4 text-center text-xs text-red-300">{message}</p>}
      </form>
    </main>
  );

  return (
    <main className="admin-page min-h-dvh bg-surface px-5 py-8 text-white sm:px-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/10 pb-6">
        <div><p className="text-[10px] uppercase tracking-[0.3em] text-accent">Mahadev control room</p><h1 className="mt-2 font-serif text-3xl">Good to see you, Pruthvirajsinh.</h1></div>
        <button type="button" onClick={logout} className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition-colors hover:border-accent/50 hover:text-accent">Log out</button>
      </header>
      <section className="mx-auto grid max-w-6xl gap-4 py-8 sm:grid-cols-3">
        {['50 tracks', '3 playlists', 'PWA ready'].map((item, index) => <div key={item} className="admin-stat rounded-2xl border border-white/10 bg-white/[0.05] p-5"><div className="text-3xl font-semibold text-accent">{index === 0 ? '50' : index === 1 ? '03' : '✓'}</div><div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">{item}</div></div>)}
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"><p className="text-[10px] uppercase tracking-[0.25em] text-accent">Quick actions</p><h2 className="mt-3 text-xl font-semibold">Keep the experience fresh</h2><div className="mt-6 grid gap-3 sm:grid-cols-2"><a href="/" className="rounded-xl border border-white/10 bg-black/15 p-4 text-sm text-white/70 transition-colors hover:border-accent/40 hover:text-white">Preview listening room <span className="float-right text-accent">↗</span></a><a href="mailto:pruthvirajsinh.biz@gmail.com" className="rounded-xl border border-white/10 bg-black/15 p-4 text-sm text-white/70 transition-colors hover:border-accent/40 hover:text-white">Open project inquiries <span className="float-right text-accent">↗</span></a></div></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"><p className="text-[10px] uppercase tracking-[0.25em] text-accent">Next layer</p><h2 className="mt-3 text-xl font-semibold">CMS connection</h2><p className="mt-3 text-sm leading-6 text-white/55">This secure shell is ready for a database or CMS so you can edit songs, playlists, inquiries, and announcements without changing code.</p></div>
      </section>
    </main>
  );
}
