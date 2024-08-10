import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopProgressbar from '@/components/TopProgressbar';
import { cookies } from 'next/headers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Muzikly - Online Music Platform',
  description:
    'Discover your favorite tunes with Muzikly. Enjoy your music anytime, anywhere, even offline.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get('theme');
  return (
    <html lang="en" className={`${theme?.value || 'dark'} h-full`}>
      <body
        className={`${inter.className} h-full dark:bg-zinc-950 dark:text-white`}
      >
        <TopProgressbar />
        {children}
      </body>
    </html>
  );
}
