import { auth } from '../../lib/auth';
import { redirect } from 'next/navigation';
import UserBar from '../../components/UserBar';
import BypassSection from '../../components/BypassSection';

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const { name, email, image } = session.user;

  return (
    <div className="min-h-screen bg-black text-white">
      <UserBar
        name={name  ?? 'User'}
        email={email ?? ''}
        avatar={image}
      />

      {/* Hero */}
      <main className="pt-32 pb-20 px-4">
        <div className="text-center mb-16">
          <p className="text-white/20 text-xs tracking-widest uppercase mb-3">BypassHub</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Instant Key Bypass
          </h1>
          <p className="text-white/30 text-sm mt-3 max-w-sm mx-auto">
            Paste your Platoboost link and get your key in seconds. Timer persists across refreshes.
          </p>
        </div>

        <BypassSection />

        {/* Footer */}
        <p className="text-white/10 text-xs text-center mt-20">
          © 2025 BypassHub — not affiliated with Platoboost
        </p>
      </main>
    </div>
  );
}
