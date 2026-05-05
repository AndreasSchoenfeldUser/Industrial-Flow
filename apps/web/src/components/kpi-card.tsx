import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';

export function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = 'default',
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  tone?: 'default' | 'success' | 'warn' | 'danger' | 'info';
}) {
  const toneClass: Record<typeof tone, string> = {
    default: 'text-[color:var(--color-fg)]',
    success: 'text-[color:var(--color-success)]',
    warn: 'text-[color:var(--color-warn)]',
    danger: 'text-[color:var(--color-danger)]',
    info: 'text-[color:var(--color-info)]',
  };
  return (
    <div className="rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/70 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-[color:var(--color-fg-dim)]">
          {label}
        </span>
        <Icon className={cn('h-4 w-4', toneClass[tone])} aria-hidden />
      </div>
      <div className={cn('mt-2 text-2xl font-semibold tracking-tight', toneClass[tone])}>
        {value}
      </div>
      {hint ? (
        <div className="mt-1 text-xs text-[color:var(--color-fg-muted)]">{hint}</div>
      ) : null}
    </div>
  );
}
