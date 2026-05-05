import type { ComplianceOverview, ComplianceReport } from '@industrialflow/types';

const daysAgo = (d: number) =>
  new Date(Date.now() - d * 24 * 60 * 60_000).toISOString();

export const complianceReports: ComplianceReport[] = [
  {
    id: 'rep-2026-04-iec',
    standard: 'IEC-62443',
    generatedAt: daysAgo(3),
    generatedBy: 'andreas',
    coverage: 92,
    status: 'ok',
    auditEntryCount: 1284,
  },
  {
    id: 'rep-2026-04-nis2',
    standard: 'NIS2',
    generatedAt: daysAgo(7),
    generatedBy: 'andreas',
    coverage: 81,
    status: 'attention',
    auditEntryCount: 1196,
  },
  {
    id: 'rep-2026-03-tisax',
    standard: 'TISAX-prep',
    generatedAt: daysAgo(21),
    generatedBy: 'andreas',
    coverage: 74,
    status: 'attention',
    auditEntryCount: 982,
  },
  {
    id: 'rep-2026-03-cra',
    standard: 'CRA',
    generatedAt: daysAgo(28),
    generatedBy: 'andreas',
    coverage: 68,
    status: 'gap',
    auditEntryCount: 901,
  },
];

export const complianceOverview: ComplianceOverview = {
  sbomFormat: 'CycloneDX+SPDX',
  sbomSigned: true,
  auditEntryCount: 1342,
  rbacRoles: ['it-devops', 'ot-readonly'],
  reports: complianceReports,
};
