import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { TopBar } from '@/components/topbar';
import { sites } from '@industrialflow/mock-data';

export const metadata: Metadata = {
  title: 'IndustrialFlow',
  description:
    'CI/CD-Plattform für Industrial DevOps — Phase 1 GUI-Mockup mit Mock-Daten.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen min-w-0 flex-1 flex-col">
            <TopBar sites={sites} />
            <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
