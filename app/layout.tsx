import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BypassHub',
  description: 'Fastest Platoboost bypass.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-mono antialiased min-h-screen bg-black text-white">
        {children}
      </body>
    </html>
  );
}
