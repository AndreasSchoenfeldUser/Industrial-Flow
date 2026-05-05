import { cn } from '@/lib/cn';

type Variant = 'default' | 'success' | 'warn' | 'danger' | 'info' | 'muted' | 'locked';

const variantClass: Record<Variant, string> = {
  default: 'bg-[color:var(--color-panel)] text-[color:var(--color-fg)]',
  success: 'bg-[color:rgba(37,194,106,0.15)] text-[color:var(--color-success)]',
  warn: 'bg-[color:rgba(246,183,60,0.18)] text-[color:var(--color-warn)]',
  danger: 'bg-[color:rgba(239,70,85,0.18)] text-[color:var(--color-danger)]',
  info: 'bg-[color:rgba(74,163,255,0.18)] text-[color:var(--color-info)]',
  muted: 'bg-[color:var(--color-bg-elev)] text-[color:var(--color-fg-muted)]',
  locked: 'bg-[color:rgba(183,121,255,0.18)] text-[color:var(--color-locked)]',
};

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium uppercase tracking-wide',
        variantClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
