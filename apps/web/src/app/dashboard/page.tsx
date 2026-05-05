import Link from 'next/link';
import {
  assistantConversation,
  assistantSuggestedActions,
  complianceOverview,
  maintenanceWindows,
  mockPipelineProvider,
} from '@industrialflow/mock-data';
import { KpiCard } from '@/components/kpi-card';
import { PipelineList } from '@/components/pipeline-list';
import { AssistantPanel } from '@/components/assistant-panel';
import { ComplianceFooter } from '@/components/compliance-footer';
import {
  Activity,
  CalendarClock,
  Server,
  ShieldCheck,
} from 'lucide-react';
import { formatRelative } from '@/lib/format';

export default async function DashboardPage() {
  const pipelines = await mockPipelineProvider.list();
  const activeRuns = pipelines.filter(
    (p) => p.status === 'running' || p.status === 'queued',
  );
  const activeWindow = maintenanceWindows.find((w) => w.active);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Werks-Übersicht</h1>
          <p className="text-sm text-[color:var(--color-fg-muted)]">
            Pipelines, OT-Status und Compliance-Lage auf einen Blick.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={Activity}
          label="Aktive Pipelines"
          value={String(activeRuns.length)}
          hint={`${pipelines.length} insgesamt im Sichtfeld`}
          tone="info"
        />
        <KpiCard
          icon={Server}
          label="OT-Proxy"
          value="Online"
          hint="mTLS aktiv · Heartbeat 12 s"
          tone="success"
        />
        <KpiCard
          icon={ShieldCheck}
          label="IEC 62443"
          value="92 %"
          hint="Letzter Report vor 3 Tagen"
          tone="success"
        />
        <KpiCard
          icon={CalendarClock}
          label="Wartungsfenster"
          value={
            activeWindow
              ? `${activeWindow.weekday.toUpperCase()} · ${activeWindow.from}`
              : 'Kein aktives'
          }
          hint={
            activeWindow
              ? `Werk ${activeWindow.site} · ${formatRelative(activeWindow.nextStartAt)}`
              : 'Nächstes nach Plan'
          }
          tone={activeWindow ? 'warn' : 'default'}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
              Pipelines
            </h2>
            <Link
              href="/pipelines"
              className="text-xs text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]"
            >
              Alle anzeigen →
            </Link>
          </div>
          <PipelineList pipelines={pipelines} />
        </div>
        <AssistantPanel
          conversation={assistantConversation}
          actions={assistantSuggestedActions}
        />
      </section>

      <ComplianceFooter overview={complianceOverview} />
    </div>
  );
}
