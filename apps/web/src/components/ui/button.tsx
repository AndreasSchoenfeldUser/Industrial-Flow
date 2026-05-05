import { cn } from '@/lib/cn';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const variantClass: Record<Variant, string> = {
  primary:
    'bg-[color:var(--color-accent)] text-[color:var(--color-accent-fg)] hover:opacity-90',
  secondary:
    'bg-[color:var(--color-bg-elev)] text-[color:var(--color-fg)] border border-[color:var(--color-border)] hover:bg-[color:var(--color-panel)]',
  ghost:
    'bg-transparent text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-bg-elev)] hover:text-[color:var(--color-fg)]',
  danger:
    'bg-[color:var(--color-danger)] text-white hover:opacity-90',
};

export function Button({
  variant = 'secondary',
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-[var(--radius-md)] px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
        variantClass[variant],
        className,
      )}
      {...rest}
    />
  );
}
