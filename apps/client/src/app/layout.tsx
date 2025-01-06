import './global.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/shadcnui/toaster';

export const metadata = {
  title: 'Events Platform',
  description: 'Explore the unlimited guide to local events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className="flex justify-center bg-background text-foreground">
        <div className="w-full max-w-[1400px] min-h-screen flex flex-col px-gap4 py-gap1">
          <Header />
          <main className="py-gap5 flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
