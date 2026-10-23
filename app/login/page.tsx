'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="inline-block border border-white/10 px-4 py-1 text-xs text-white/30 mb-6 tracking-widest uppercase rounded-full">
            BypassHub
          </span>
          <h1 className="text-4xl font-bold text-white tracking-tight">Sign in</h1>
          <p className="text-white/30 text-sm mt-2">Fastest Platoboost key bypass</p>
        </div>

        <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02]">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3.5 px-4 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-150 text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <p className="text-white/15 text-xs text-center mt-5">
            Session persists — no repeated logins
          </p>
        </div>

        <p className="text-white/10 text-xs text-center mt-8">
          © 2025 BypassHub
        </p>
      </div>
    </div>
  );
}
