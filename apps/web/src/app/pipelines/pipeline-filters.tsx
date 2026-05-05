'use client';

// Client component because filters update the URL via router.replace().
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Pipeline, RunStatus, Site } from '@industrialflow/types';
import { PipelineList } from '@/components/pipeline-list';
import { cn } from '@/lib/cn';

const statuses: { value: RunStatus | ''; label: string }[] = [
  { value: '', label: 'Alle' },
  { value: 'running', label: 'Läuft' },
  { value: 'success', label: 'Erfolg' },
  { value: 'failed', label: 'Fehler' },
  { value: 'waiting-maintenance', label: 'Wartet' },
  { value: 'production-locked', label: 'Gesperrt' },
  { value: 'queued', label: 'Queue' },
];

const targetTypes = [
  { value: '', label: 'Alle Ziele' },
  { value: 'cnc', label: 'CNC' },
  { value: 'plc', label: 'PLC' },
  { value: 'hmi', label: 'HMI' },
  { value: 'edge', label: 'Edge' },
  { value: 'robot', label: 'Robot' },
];

export function PipelineFilters({
  sites,
  active,
  pipelines,
}: {
  sites: Site[];
  active: { status?: string; site?: string; targetType?: string; sort?: string };
  pipelines: Pipeline[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  function setParam(key: string, value: string | undefined) {
    const next = new URLSearchParams(params.toString());
    if (value && value.length > 0) next.set(key, value);
    else next.delete(key);
    router.replace(`/pipelines?${next.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {statuses.map((s) => (
          <button
            key={s.value || 'all'}
            onClick={() => setParam('status', s.value || undefined)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs transition',
              (active.status ?? '') === s.value
                ? 'border-[color:var(--color-accent)] bg-[color:rgba(255,91,19,0.12)] text-[color:var(--color-fg)]'
                : 'border-[color:var(--color-border)] text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]',
            )}
          >
            {s.label}
          </button>
        ))}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <select
            value={active.site ?? ''}
            onChange={(e) => setParam('site', e.target.value || undefined)}
            className="rounded-md border bg-[color:var(--color-bg-elev)] px-3 py-1 text-xs"
          >
            <option value="">Alle Werke</option>
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            value={active.targetType ?? ''}
            onChange={(e) => setParam('targetType', e.target.value || undefined)}
            className="rounded-md border bg-[color:var(--color-bg-elev)] px-3 py-1 text-xs"
          >
            {targetTypes.map((t) => (
              <option key={t.value || 'all'} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <select
            value={active.sort ?? 'recent'}
            onChange={(e) => setParam('sort', e.target.value === 'recent' ? undefined : e.target.value)}
            className="rounded-md border bg-[color:var(--color-bg-elev)] px-3 py-1 text-xs"
          >
            <option value="recent">Letzter Lauf</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {pipelines.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed p-8 text-center text-sm text-[color:var(--color-fg-muted)]">
          Keine Pipelines passen zu diesen Filtern.{' '}
          <Link href="/pipelines" className="underline">
            Filter zurücksetzen
          </Link>
        </div>
      ) : (
        <PipelineList pipelines={pipelines} />
      )}
    </div>
  );
}
