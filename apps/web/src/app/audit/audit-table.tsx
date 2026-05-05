'use client';

// Client component because filters update the URL via router.replace().
import { useRouter, useSearchParams } from 'next/navigation';
import type { AuditEntry } from '@industrialflow/types';
import { formatDateTime } from '@/lib/format';
import { Badge } from '@/components/ui/badge';

const actionLabel: Record<AuditEntry['action'], string> = {
  'pipeline.start': 'Pipeline-Start',
  'pipeline.approve': 'Freigabe',
  'pipeline.cancel': 'Abbruch',
  'pipeline.rollback': 'Rollback',
  'maintenance.open': 'Wartungsfenster',
  'maintenance.close': 'Wartungsfenster Ende',
  'config.change': 'Konfiguration',
  login: 'Login',
};

const actionVariant: Record<
  AuditEntry['action'],
  'success' | 'warn' | 'danger' | 'info' | 'muted' | 'locked'
> = {
  'pipeline.start': 'info',
  'pipeline.approve': 'success',
  'pipeline.cancel': 'danger',
  'pipeline.rollback': 'warn',
  'maintenance.open': 'warn',
  'maintenance.close': 'muted',
  'config.change': 'muted',
  login: 'muted',
};

export function AuditTable({
  entries,
  active,
}: {
  entries: AuditEntry[];
  active: { user?: string; pipelineId?: string; range?: string };
}) {
  const router = useRouter();
  const params = useSearchParams();

  function setParam(key: string, value: string | undefined) {
    const next = new URLSearchParams(params.toString());
    if (value && value.length > 0) next.set(key, value);
    else next.delete(key);
    router.replace(`/audit?${next.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          defaultValue={active.user ?? ''}
          onChange={(e) => setParam('user', e.target.value || undefined)}
          placeholder="Benutzer filtern…"
          className="rounded-md border bg-[color:var(--color-bg-elev)] px-3 py-1 text-xs"
        />
        <input
          defaultValue={active.pipelineId ?? ''}
          onChange={(e) => setParam('pipelineId', e.target.value || undefined)}
          placeholder="Pipeline-ID…"
          className="rounded-md border bg-[color:var(--color-bg-elev)] px-3 py-1 text-xs"
        />
        <select
          value={active.range ?? ''}
          onChange={(e) => setParam('range', e.target.value || undefined)}
          className="rounded-md border bg-[color:var(--color-bg-elev)] px-3 py-1 text-xs"
        >
          <option value="">Gesamter Zeitraum</option>
          <option value="24h">Letzte 24 h</option>
          <option value="7d">Letzte 7 Tage</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/60">
        <table className="w-full text-sm">
          <thead className="bg-[color:var(--color-bg-elev)] text-[10px] uppercase tracking-wider text-[color:var(--color-fg-dim)]">
            <tr>
              <th className="px-4 py-2 text-left">Zeit</th>
              <th className="px-4 py-2 text-left">Benutzer</th>
              <th className="px-4 py-2 text-left">Aktion</th>
              <th className="px-4 py-2 text-left">Pipeline</th>
              <th className="px-4 py-2 text-left">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {entries.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-[color:var(--color-fg-muted)]"
                >
                  Keine Einträge passen zu diesen Filtern.
                </td>
              </tr>
            ) : (
              entries.map((e) => (
                <tr key={e.id}>
                  <td className="whitespace-nowrap px-4 py-2 text-xs text-[color:var(--color-fg-muted)]">
                    {formatDateTime(e.timestamp)}
                  </td>
                  <td className="px-4 py-2 font-medium">{e.user}</td>
                  <td className="px-4 py-2">
                    <Badge variant={actionVariant[e.action]}>
                      {actionLabel[e.action]}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">
                    {e.pipelineId ?? '–'}
                  </td>
                  <td className="px-4 py-2 text-[color:var(--color-fg-muted)]">
                    {e.detail}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
