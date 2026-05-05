import { complianceOverview } from '@industrialflow/mock-data';
import { Badge } from '@/components/ui/badge';
import { CoverageChart } from './coverage-chart';
import { Download, FileSignature, ShieldCheck, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/format';
import { ComplianceFooter } from '@/components/compliance-footer';

const standardLabel: Record<string, string> = {
  'IEC-62443': 'IEC 62443',
  NIS2: 'NIS2',
  'TISAX-prep': 'TISAX-Vorbereitung',
  CRA: 'EU Cyber Resilience Act',
};

export default function CompliancePage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight">Compliance</h1>
        <p className="text-sm text-[color:var(--color-fg-muted)]">
          Reports nach Standard. Generierung und Signatur erfolgen pro Build (Phase 5).
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/70 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[color:var(--color-fg-dim)]">
            SBOM
            <FileSignature className="h-4 w-4" aria-hidden />
          </div>
          <div className="mt-2 text-lg font-semibold">{complianceOverview.sbomFormat}</div>
          <div className="mt-1 text-xs text-[color:var(--color-fg-muted)]">
            {complianceOverview.sbomSigned ? 'cosign-signiert' : 'unsigniert'}
          </div>
        </div>
        <div className="rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/70 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[color:var(--color-fg-dim)]">
            Audit-Einträge
            <ScrollText className="h-4 w-4" aria-hidden />
          </div>
          <div className="mt-2 text-lg font-semibold">
            {complianceOverview.auditEntryCount.toLocaleString('de-DE')}
          </div>
          <div className="mt-1 text-xs text-[color:var(--color-fg-muted)]">
            Append-only ab Phase 5
          </div>
        </div>
        <div className="rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/70 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[color:var(--color-fg-dim)]">
            RBAC-Rollen
            <ShieldCheck className="h-4 w-4" aria-hidden />
          </div>
          <div className="mt-2 text-lg font-semibold">
            {complianceOverview.rbacRoles.join(' / ')}
          </div>
          <div className="mt-1 text-xs text-[color:var(--color-fg-muted)]">
            Quelle: JCasC
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
          Abdeckung pro Standard
        </h2>
        <CoverageChart reports={complianceOverview.reports} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
          Letzte Reports
        </h2>
        <ul className="divide-y rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/60">
          {complianceOverview.reports.map((r) => (
            <li
              key={r.id}
              className="flex flex-wrap items-center gap-3 px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium">
                  {standardLabel[r.standard] ?? r.standard}
                </div>
                <div className="mt-0.5 text-xs text-[color:var(--color-fg-muted)]">
                  Generiert {formatDateTime(r.generatedAt)} von {r.generatedBy} ·{' '}
                  {r.auditEntryCount.toLocaleString('de-DE')} Audit-Einträge
                </div>
              </div>
              <Badge
                variant={
                  r.status === 'ok'
                    ? 'success'
                    : r.status === 'attention'
                      ? 'warn'
                      : 'danger'
                }
              >
                {r.coverage}% Abdeckung
              </Badge>
              <Button variant="secondary">
                <Download className="h-3.5 w-3.5" aria-hidden />
                PDF
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <ComplianceFooter overview={complianceOverview} />
    </div>
  );
}
