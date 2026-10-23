'use client';
import { useState, useEffect } from 'react';

const TIMER_KEY  = 'bp_timer_start';
const KEY_CACHE  = 'bp_key_cache';
const URL_CACHE  = 'bp_url_cache';

function fmt(sec: number) {
  if (sec <= 0) return '00:00:00';
  const h = Math.floor(sec / 3600).toString().padStart(2, '0');
  const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function secsLeft() {
  const raw = localStorage.getItem(TIMER_KEY);
  if (!raw) return 0;
  const left = 86400 - Math.floor((Date.now() - parseInt(raw, 10)) / 1000);
  return left > 0 ? left : 0;
}

export default function BypassSection() {
  const [url,       setUrl]       = useState('');
  const [key,       setKey]       = useState('');
  const [status,    setStatus]    = useState<'idle'|'loading'|'done'|'error'>('idle');
  const [errMsg,    setErrMsg]    = useState('');
  const [countdown, setCountdown] = useState(0);
  const [copied,    setCopied]    = useState(false);

  useEffect(() => {
    const k   = localStorage.getItem(KEY_CACHE);
    const u   = localStorage.getItem(URL_CACHE);
    const sec = secsLeft();
    if (k && sec > 0) {
      setKey(k);
      setStatus('done');
      setCountdown(sec);
      if (u) setUrl(u);
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => {
      setCountdown((p) => {
        const n = p - 1;
        if (n <= 0) {
          localStorage.removeItem(TIMER_KEY);
          localStorage.removeItem(KEY_CACHE);
          localStorage.removeItem(URL_CACHE);
          setKey('');
          setStatus('idle');
          return 0;
        }
        return n;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  async function handleBypass() {
    if (!url.trim()) return;
    setStatus('loading');
    setErrMsg('');
    setKey('');
    try {
      const res  = await fetch('/api/bypass', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.key) throw new Error(data.error || 'Bypass failed');

      localStorage.setItem(KEY_CACHE,  data.key);
      localStorage.setItem(URL_CACHE,  url.trim());
      localStorage.setItem(TIMER_KEY,  Date.now().toString());

      setKey(data.key);
      setCountdown(86400);
      setStatus('done');
    } catch (e: any) {
      setErrMsg(e.message);
      setStatus('error');
    }
  }

  function copy() {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">

      {/* Timer */}
      <div className="text-center mb-14">
        <div className="font-mono text-[72px] sm:text-[96px] font-bold text-white leading-none tracking-widest tabular-nums select-none">
          {status === 'done' ? fmt(countdown) : '00:00:00'}
        </div>
        <p className="text-white/20 text-[11px] mt-3 tracking-widest uppercase">
          {status === 'done' ? 'Key expires in' : 'Awaiting bypass'}
        </p>
      </div>

      {/* Input */}
      <div className="space-y-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleBypass()}
          placeholder="Paste Platoboost / loot.link / platorelay URL…"
          disabled={status === 'loading'}
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/25 transition-all duration-150 disabled:opacity-30"
        />

        <button
          onClick={handleBypass}
          disabled={status === 'loading' || !url.trim()}
          className="w-full bg-white text-black font-bold py-4 rounded-xl text-sm tracking-widest uppercase hover:bg-white/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          {status === 'loading'
            ? <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Bypassing…
              </span>
            : 'Bypass'
          }
        </button>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="mt-5 border border-red-500/20 bg-red-500/5 rounded-xl px-5 py-4">
          <p className="text-red-400 text-sm">{errMsg}</p>
        </div>
      )}

      {/* Key */}
      {status === 'done' && key && (
        <div className="mt-6 border border-white/10 rounded-xl bg-white/[0.03] px-5 py-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/30 text-[11px] tracking-widest uppercase">Your Key</span>
            <button
              onClick={copy}
              className="text-xs border border-white/10 px-3 py-1 rounded-lg text-white/40 hover:text-white/70 hover:border-white/25 transition-all duration-150"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-white text-sm font-mono break-all">{key}</p>

          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-white/20 text-xs">Valid for</span>
            <span className="text-white/50 text-xs font-mono tabular-nums">{fmt(countdown)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
