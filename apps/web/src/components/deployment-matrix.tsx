import type { MachineTarget } from '@industrialflow/types';
import { cn } from '@/lib/cn';
import { Badge } from './ui/badge';

const slotColor = {
  blue: 'bg-[color:rgba(74,163,255,0.2)] text-[color:var(--color-info)]',
  green: 'bg-[color:rgba(37,194,106,0.2)] text-[color:var(--color-success)]',
} as const;

const machineStatusLabel: Record<MachineTarget['status'], string> = {
  idle: 'Idle',
  'running-production': 'Produktion läuft',
  updating: 'Update läuft',
  updated: 'Aktualisiert',
  pending: 'Ausstehend',
  locked: 'Gesperrt',
};

const machineStatusVariant: Record<
  MachineTarget['status'],
  'success' | 'warn' | 'info' | 'muted' | 'locked'
> = {
  idle: 'muted',
  'running-production': 'warn',
  updating: 'info',
  updated: 'success',
  pending: 'muted',
  locked: 'locked',
};

export function DeploymentMatrix({ targets }: { targets: MachineTarget[] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/50">
      <table className="w-full text-sm">
        <thead className="bg-[color:var(--color-bg-elev)] text-[10px] uppercase tracking-wider text-[color:var(--color-fg-dim)]">
          <tr>
            <th className="px-4 py-2 text-left">Maschine</th>
            <th className="px-4 py-2 text-left">Halle</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Slot</th>
            <th className="px-4 py-2 text-left">Version</th>
            <th className="px-4 py-2 text-left">Fortschritt</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {targets.map((t) => (
            <tr key={t.id} className="text-sm">
              <td className="px-4 py-2 font-medium">
                {t.id}
                <span className="ml-2 text-xs text-[color:var(--color-fg-dim)]">
                  {t.type.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-2 text-[color:var(--color-fg-muted)]">{t.hall}</td>
              <td className="px-4 py-2">
                <Badge variant={machineStatusVariant[t.status]}>
                  {machineStatusLabel[t.status]}
                </Badge>
              </td>
              <td className="px-4 py-2">
                {t.activeSlot ? (
                  <span
                    className={cn(
                      'inline-flex rounded-md px-2 py-0.5 text-xs font-medium uppercase tracking-wide',
                      slotColor[t.activeSlot],
                    )}
                  >
                    {t.activeSlot}
                  </span>
                ) : (
                  <span className="text-xs text-[color:var(--color-fg-dim)]">–</span>
                )}
              </td>
              <td className="px-4 py-2 font-mono text-xs">
                {t.currentVersion}
                {t.targetVersion && t.targetVersion !== t.currentVersion ? (
                  <span className="text-[color:var(--color-fg-dim)]">
                    {' → '}
                    {t.targetVersion}
                  </span>
                ) : null}
              </td>
              <td className="px-4 py-2">
                {t.progress !== undefined ? (
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-32 rounded-full bg-[color:var(--color-bg-elev)]">
                      <div
                        className="h-full rounded-full bg-[color:var(--color-info)]"
                        style={{ width: `${t.progress}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs">{t.progress}%</span>
                  </div>
                ) : (
                  <span className="text-xs text-[color:var(--color-fg-dim)]">–</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
