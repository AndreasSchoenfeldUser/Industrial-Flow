'use client';

// Client component because the site selector and air-gap indicator
// will hold transient UI state in later phases.
import { ChevronDown, ShieldOff, Wifi, WifiOff } from 'lucide-react';
import { useState } from 'react';
import type { Site } from '@industrialflow/types';
import { Badge } from './ui/badge';

export function TopBar({ sites }: { sites: Site[] }) {
  const [siteId, setSiteId] = useState(sites[0]?.id ?? '');
  const site = sites.find((s) => s.id === siteId) ?? sites[0];
  if (!site) return null;

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-[color:var(--color-bg)]/85 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <label className="relative">
          <select
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
            className="appearance-none rounded-md border bg-[color:var(--color-bg-elev)] py-1.5 pl-3 pr-8 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
          >
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
            aria-hidden
          />
        </label>

        {site.airGapped ? (
          <Badge variant="warn">
            <ShieldOff className="h-3 w-3" aria-hidden />
            Air-Gap aktiv
          </Badge>
        ) : (
          <Badge variant="info">
            <Wifi className="h-3 w-3" aria-hidden />
            Online-Modus
          </Badge>
        )}

        <Badge
          variant={
            site.otProxy === 'online'
              ? 'success'
              : site.otProxy === 'degraded'
                ? 'warn'
                : 'danger'
          }
        >
          {site.otProxy === 'offline' ? (
            <WifiOff className="h-3 w-3" aria-hidden />
          ) : (
            <Wifi className="h-3 w-3" aria-hidden />
          )}
          OT-Proxy {site.otProxy}
        </Badge>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="hidden text-[color:var(--color-fg-muted)] sm:inline">
          Angemeldet als
        </span>
        <span className="rounded-full bg-[color:var(--color-panel)] px-3 py-1 text-xs font-medium">
          andreas (it-devops)
        </span>
      </div>
    </header>
  );
}
