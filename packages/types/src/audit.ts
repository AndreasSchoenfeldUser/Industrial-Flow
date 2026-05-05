export type AuditAction =
  | 'pipeline.start'
  | 'pipeline.approve'
  | 'pipeline.cancel'
  | 'pipeline.rollback'
  | 'maintenance.open'
  | 'maintenance.close'
  | 'config.change'
  | 'login';

export type AuditEntry = {
  id: string;
  timestamp: string;
  user: string;
  action: AuditAction;
  pipelineId?: string;
  target?: string;
  detail: string;
};
