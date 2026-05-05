import type { ComplianceOverview } from '@industrialflow/types';
import { FileSignature, ScrollText, Users } from 'lucide-react';

export function ComplianceFooter({ overview }: { overview: ComplianceOverview }) {
  return (
    <footer className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-xs text-[color:var(--color-fg-muted)]">
      <div className="flex items-center gap-1.5">
        <FileSignature className="h-3.5 w-3.5" aria-hidden />
        SBOM: {overview.sbomFormat}
        {overview.sbomSigned ? ' · cosign-signiert' : ' · unsigniert'}
      </div>
      <div className="flex items-center gap-1.5">
        <ScrollText className="h-3.5 w-3.5" aria-hidden />
        Audit-Log: {overview.auditEntryCount.toLocaleString('de-DE')} Einträge
      </div>
      <div className="flex items-center gap-1.5">
        <Users className="h-3.5 w-3.5" aria-hidden />
        RBAC: {overview.rbacRoles.join(' / ')}
      </div>
      <span className="ml-auto">
        IEC 62443 · NIS2 · TISAX-Vorbereitung · CRA
      </span>
    </footer>
  );
}
