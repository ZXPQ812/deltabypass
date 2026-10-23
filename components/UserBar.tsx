'use client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

interface Props {
  name: string;
  email: string;
  avatar?: string | null;
}

export default function UserBar({ name, email, avatar }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-black/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <span className="text-white/30 text-xs tracking-widest uppercase">BypassHub</span>

        <div className="flex items-center gap-3">
          {avatar && (
            <Image
              src={avatar}
              alt={name}
              width={28}
              height={28}
              className="rounded-full ring-1 ring-white/20"
            />
          )}
          <div className="hidden sm:block text-right">
            <p className="text-white text-xs font-medium leading-none">{name}</p>
            <p className="text-white/30 text-[11px] mt-0.5">{email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="ml-1 text-xs text-white/30 border border-white/10 px-3 py-1.5 rounded-lg hover:border-white/25 hover:text-white/60 transition-all duration-150"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
