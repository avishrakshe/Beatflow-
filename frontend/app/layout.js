import dynamic from 'next/dynamic';
import '../styles/globals.css';

const SolanaProviders = dynamic(() => import('./providers'), {
  ssr: false,
});

export const metadata = {
  title: 'BeatFlow Mobile - Solana Music App',
  description: 'Mobile-first Solana music marketplace with on-chain proof and paid streaming',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'BeatFlow',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#09090b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-white">
        <SolanaProviders>{children}</SolanaProviders>
      </body>
    </html>
  );
}
