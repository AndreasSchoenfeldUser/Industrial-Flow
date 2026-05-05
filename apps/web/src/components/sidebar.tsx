'use client';

// Client component for the active route highlight via usePathname.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  ClipboardList,
  Factory,
  GitBranch,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/cn';

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: Factory },
  { href: '/pipelines', label: 'Pipelines', icon: GitBranch },
  { href: '/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/audit', label: 'Audit-Log', icon: ClipboardList },
  { href: '/m', label: 'Werker-Mobile', icon: Smartphone },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 border-r bg-[color:var(--color-bg-elev)] md:flex md:flex-col">
      <div className="flex items-center gap-2 px-4 py-5">
        <Activity className="h-5 w-5 text-[color:var(--color-accent)]" aria-hidden />
        <div>
          <div className="text-sm font-semibold tracking-tight">IndustrialFlow</div>
          <div className="text-[10px] uppercase tracking-wider text-[color:var(--color-fg-dim)]">
            Phase 1 Mockup
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-0.5 px-2 py-2 text-sm">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 transition',
                active
                  ? 'bg-[color:var(--color-panel)] text-[color:var(--color-fg)]'
                  : 'text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-panel)]/60 hover:text-[color:var(--color-fg)]',
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-4 py-4 text-[11px] leading-relaxed text-[color:var(--color-fg-dim)]">
        Air-Gap-fähig nach Phase 6.
        <br />
        Jenkins-Kern ab Phase 2.
      </div>
    </aside>
  );
}
