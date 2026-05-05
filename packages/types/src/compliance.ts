export type ComplianceStandard =
  | 'IEC-62443'
  | 'NIS2'
  | 'TISAX-prep'
  | 'CRA';

export type ComplianceStatus = 'ok' | 'attention' | 'gap';

export type ComplianceReport = {
  id: string;
  standard: ComplianceStandard;
  generatedAt: string;
  generatedBy: string;
  coverage: number;
  status: ComplianceStatus;
  // Anzahl der erfassten Audit-Einträge im Reporting-Zeitraum.
  auditEntryCount: number;
};

export type ComplianceOverview = {
  sbomFormat: 'CycloneDX+SPDX';
  sbomSigned: boolean;
  auditEntryCount: number;
  rbacRoles: string[];
  reports: ComplianceReport[];
};
