import { auditEntries } from '@industrialflow/mock-data';
import { AuditTable } from './audit-table';

export default async function AuditPage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string; pipelineId?: string; range?: string }>;
}) {
  const params = await searchParams;
  let entries = [...auditEntries];

  if (params.user) {
    entries = entries.filter((e) =>
      e.user.toLowerCase().includes(params.user!.toLowerCase()),
    );
  }
  if (params.pipelineId) {
    entries = entries.filter((e) => e.pipelineId === params.pipelineId);
  }

  const since =
    params.range === '24h'
      ? Date.now() - 24 * 60 * 60_000
      : params.range === '7d'
        ? Date.now() - 7 * 24 * 60 * 60_000
        : 0;
  if (since > 0) {
    entries = entries.filter((e) => new Date(e.timestamp).getTime() >= since);
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight">Audit-Log</h1>
        <p className="text-sm text-[color:var(--color-fg-muted)]">
          Filter nach Benutzer, Pipeline oder Zeitraum. Append-only ab Phase 5.
        </p>
      </header>

      <AuditTable
        entries={entries}
        active={{
          user: params.user,
          pipelineId: params.pipelineId,
          range: params.range,
        }}
      />
    </div>
  );
}
