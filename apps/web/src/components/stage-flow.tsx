import type { Stage } from '@industrialflow/types';
import { cn } from '@/lib/cn';
import {
  CheckCircle2,
  CircleDashed,
  Loader2,
  MinusCircle,
  XCircle,
} from 'lucide-react';
import { formatDuration } from '@/lib/format';

const stageIcon = {
  pending: CircleDashed,
  running: Loader2,
  success: CheckCircle2,
  failed: XCircle,
  skipped: MinusCircle,
} as const;

const stageColor = {
  pending: 'text-[color:var(--color-fg-dim)] border-[color:var(--color-border)]',
  running:
    'text-[color:var(--color-info)] border-[color:var(--color-info)] bg-[color:rgba(74,163,255,0.08)]',
  success:
    'text-[color:var(--color-success)] border-[color:var(--color-success)] bg-[color:rgba(37,194,106,0.08)]',
  failed:
    'text-[color:var(--color-danger)] border-[color:var(--color-danger)] bg-[color:rgba(239,70,85,0.08)]',
  skipped: 'text-[color:var(--color-fg-dim)] border-dashed',
} as const;

export function StageFlow({
  title,
  subtitle,
  stages,
}: {
  title: string;
  subtitle: string;
  stages: Stage[];
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          <p className="text-xs text-[color:var(--color-fg-muted)]">{subtitle}</p>
        </div>
      </div>
      <ol className="grid grid-cols-1 gap-2 md:grid-cols-5">
        {stages.map((s, i) => {
          const Icon = stageIcon[s.status];
          return (
            <li
              key={`${s.name}-${i}`}
              className={cn(
                'rounded-md border px-3 py-2',
                stageColor[s.status],
              )}
            >
              <div className="flex items-center gap-2">
                <Icon
                  className={cn(
                    'h-4 w-4 shrink-0',
                    s.status === 'running' && 'animate-spin',
                  )}
                  aria-hidden
                />
                <span className="text-xs font-medium">{s.name}</span>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-[color:var(--color-fg-dim)]">
                {s.status === 'pending' ? 'wartet' : formatDuration(s.durationMs)}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
