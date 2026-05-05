import {
  maintenanceWindows,
  mockPipelineProvider,
  sites,
} from '@industrialflow/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, Clock, Factory, Wrench } from 'lucide-react';
import { formatRelative } from '@/lib/format';

export default async function MobilePage() {
  const pipelines = await mockPipelineProvider.list();
  const pendingApproval = pipelines.filter(
    (p) => p.status === 'waiting-maintenance' || p.status === 'production-locked',
  );
  const myMachines = pipelines.flatMap((p) =>
    p.targets.map((t) => ({
      ...t,
      pipelineId: p.id,
      pipelineName: p.name,
    })),
  );
  const upcoming = maintenanceWindows
    .slice()
    .sort(
      (a, b) =>
        new Date(a.nextStartAt).getTime() - new Date(b.nextStartAt).getTime(),
    )[0];

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 pb-16">
      <header className="rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/70 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[color:var(--color-fg-dim)]">
              Werker-Mobile
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Hallo, Andreas</h1>
          </div>
          <Badge variant="info">
            <Factory className="h-3 w-3" aria-hidden />
            {sites[0]?.name}
          </Badge>
        </div>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
          Freigaben ausstehend
        </h2>
        {pendingApproval.length === 0 ? (
          <div className="rounded-[var(--radius-lg)] border border-dashed p-4 text-center text-sm text-[color:var(--color-fg-muted)]">
            Keine ausstehenden Freigaben.
          </div>
        ) : (
          pendingApproval.map((p) => (
            <div
              key={p.id}
              className="rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/70 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="mt-0.5 text-xs text-[color:var(--color-fg-muted)]">
                    Run #{p.runNumber} · {p.targets.length} Maschinen
                  </div>
                </div>
                <Badge
                  variant={
                    p.status === 'waiting-maintenance' ? 'warn' : 'locked'
                  }
                >
                  {p.status === 'waiting-maintenance' ? 'Wartet' : 'Gesperrt'}
                </Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="primary" className="flex-1">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                  Freigeben
                </Button>
                <Button variant="secondary" className="flex-1">
                  Details
                </Button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
          Meine Maschinen
        </h2>
        <ul className="divide-y rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/70">
          {myMachines.slice(0, 6).map((m) => (
            <li
              key={`${m.pipelineId}-${m.id}`}
              className="flex items-center gap-3 px-4 py-3"
            >
              <Wrench
                className="h-4 w-4 text-[color:var(--color-fg-muted)]"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">
                  {m.id}
                  <span className="ml-2 text-xs text-[color:var(--color-fg-dim)]">
                    {m.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-[color:var(--color-fg-muted)]">
                  {m.hall}
                </div>
              </div>
              <Badge
                variant={
                  m.status === 'updated'
                    ? 'success'
                    : m.status === 'updating'
                      ? 'info'
                      : m.status === 'locked'
                        ? 'locked'
                        : 'muted'
                }
              >
                {m.status}
              </Badge>
              <ChevronRight
                className="h-3.5 w-3.5 text-[color:var(--color-fg-dim)]"
                aria-hidden
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
          Wartungsfenster
        </h2>
        {upcoming ? (
          <div className="rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/70 p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[color:var(--color-warn)]" aria-hidden />
              <div className="font-medium">
                Werk {upcoming.site} · {upcoming.weekday.toUpperCase()}{' '}
                {upcoming.from}–{upcoming.to}
              </div>
            </div>
            <div className="mt-1 text-xs text-[color:var(--color-fg-muted)]">
              Nächster Beginn {formatRelative(upcoming.nextStartAt)}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
