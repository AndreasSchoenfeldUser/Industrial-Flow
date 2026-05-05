import type { AuditEntry } from '@industrialflow/types';

const minutesAgo = (m: number) =>
  new Date(Date.now() - m * 60_000).toISOString();

export const auditEntries: AuditEntry[] = [
  {
    id: 'a-1042',
    timestamp: minutesAgo(2),
    user: 'andreas',
    action: 'pipeline.start',
    pipelineId: 'firmware-cnc-mills',
    detail: 'Pipeline „Firmware CNC Mills" #142 manuell gestartet',
  },
  {
    id: 'a-1041',
    timestamp: minutesAgo(7),
    user: 'andreas',
    action: 'pipeline.approve',
    pipelineId: 'firmware-cnc-mills',
    detail: 'Freigabe Stage „Production Cut-Over" erteilt',
  },
  {
    id: 'a-1040',
    timestamp: minutesAgo(18),
    user: 'andreas',
    action: 'pipeline.cancel',
    pipelineId: 'edge-gateway',
    target: 'EDGE-01',
    detail: 'OPC-UA Pre-Check fehlgeschlagen: Maschine läuft in Produktion',
  },
  {
    id: 'a-1039',
    timestamp: minutesAgo(34),
    user: 'system',
    action: 'maintenance.open',
    pipelineId: 'robot-firmware',
    detail: 'Wartungsfenster Werk Rastatt / Di 02:00–04:00 vorgemerkt',
  },
  {
    id: 'a-1038',
    timestamp: minutesAgo(64),
    user: 'andreas',
    action: 'pipeline.approve',
    pipelineId: 'plc-logic-deploy',
    detail: 'Blue-Green Cut-Over auf PLC-7, PLC-8 freigegeben',
  },
  {
    id: 'a-1037',
    timestamp: minutesAgo(78),
    user: 'andreas',
    action: 'pipeline.start',
    pipelineId: 'plc-logic-deploy',
    detail: 'Pipeline „PLC Logic Deploy" #87 gestartet',
  },
  {
    id: 'a-1036',
    timestamp: minutesAgo(207),
    user: 'system',
    action: 'pipeline.cancel',
    pipelineId: 'hmi-rollout',
    target: 'HMI-3',
    detail: 'Stage „Blue-Green Deploy" fehlgeschlagen: Touchpanel-Auflösung inkompatibel',
  },
  {
    id: 'a-1035',
    timestamp: minutesAgo(212),
    user: 'andreas',
    action: 'pipeline.start',
    pipelineId: 'hmi-rollout',
    detail: 'Pipeline „HMI Touchpanel Rollout" #33 gestartet',
  },
  {
    id: 'a-1034',
    timestamp: minutesAgo(360),
    user: 'andreas',
    action: 'config.change',
    detail: 'Wartungsfenster Werk Bremen aktualisiert: Mi 03:00–05:00',
  },
  {
    id: 'a-1033',
    timestamp: minutesAgo(420),
    user: 'andreas',
    action: 'login',
    detail: 'Anmeldung über lokalen Mock-Login',
  },
];
