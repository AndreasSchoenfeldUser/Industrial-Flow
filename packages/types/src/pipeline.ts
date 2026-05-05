import type { Stage } from './stage';
import type { MachineTarget } from './machine';

export type RunStatus =
  | 'queued'
  | 'running'
  | 'success'
  | 'failed'
  | 'waiting-maintenance'
  | 'production-locked';

export type Pipeline = {
  id: string;
  name: string;
  runNumber: number;
  branch: string;
  commit: string;
  triggeredBy: string;
  startedAt: string;
  finishedAt?: string;
  durationMs?: number;
  status: RunStatus;
  site: string;
  targetType: 'cnc' | 'plc' | 'hmi' | 'edge' | 'robot' | 'mixed';
  stages: Stage[];
  targets: MachineTarget[];
  // Phase 5: SBOM-Felder werden hier wachsen (cdxgen + cosign-Signatur).
  sbomGeneratedAt?: string;
};
