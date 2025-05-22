import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome to Muzikly - Online Music Platform',
  description:
    'Discover your favorite tunes with Muzikly. Enjoy your music anytime, anywhere, even offline.',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
} 