import Link from 'next/link';
import type { Pipeline } from '@industrialflow/types';
import { StatusBadge } from './status';
import { GitCommit } from 'lucide-react';
import { formatRelative } from '@/lib/format';

export function PipelineList({ pipelines }: { pipelines: Pipeline[] }) {
  return (
    <ul className="divide-y rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/60">
      {pipelines.map((p) => (
        <li key={p.id}>
          <Link
            href={`/pipelines/${p.id}`}
            className="flex flex-wrap items-center gap-3 px-4 py-3 transition hover:bg-[color:var(--color-panel)]"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[color:var(--color-fg)]">
                  {p.name}
                </span>
                <span className="text-xs text-[color:var(--color-fg-dim)]">
                  #{p.runNumber}
                </span>
              </div>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[color:var(--color-fg-muted)]">
                <span className="inline-flex items-center gap-1">
                  <GitCommit className="h-3 w-3" aria-hidden />
                  {p.branch} · {p.commit}
                </span>
                <span>
                  {p.targets.length} Ziel{p.targets.length === 1 ? '' : 'e'} ·{' '}
                  {p.targetType.toUpperCase()}
                </span>
                <span>{formatRelative(p.startedAt)}</span>
              </div>
            </div>
            <StatusBadge status={p.status} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
