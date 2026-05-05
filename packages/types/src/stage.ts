export type StagePhase = 'it' | 'ot';

export type StageStatus = 'pending' | 'running' | 'success' | 'failed' | 'skipped';

export type Stage = {
  name: string;
  phase: StagePhase;
  status: StageStatus;
  durationMs?: number;
  startedAt?: string;
  // Optional: kurze, menschenlesbare Beschreibung der Stage für das UI.
  description?: string;
};
