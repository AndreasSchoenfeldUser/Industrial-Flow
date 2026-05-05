import type { RunStatus } from '@industrialflow/types';
import { Badge } from './ui/badge';
import {
  CheckCircle2,
  CircleDashed,
  CircleDot,
  Lock,
  Pause,
  Play,
  XCircle,
} from 'lucide-react';

const statusLabel: Record<RunStatus, string> = {
  queued: 'In Warteschlange',
  running: 'Läuft',
  success: 'Erfolg',
  failed: 'Fehlgeschlagen',
  'waiting-maintenance': 'Wartet auf Wartungsfenster',
  'production-locked': 'Produktion gesperrt',
};

export function statusVariant(
  s: RunStatus,
): 'success' | 'warn' | 'danger' | 'info' | 'muted' | 'locked' {
  switch (s) {
    case 'success':
      return 'success';
    case 'failed':
      return 'danger';
    case 'running':
      return 'info';
    case 'waiting-maintenance':
      return 'warn';
    case 'production-locked':
      return 'locked';
    case 'queued':
      return 'muted';
  }
}

export function StatusBadge({ status }: { status: RunStatus }) {
  const Icon = statusIcon(status);
  return (
    <Badge variant={statusVariant(status)}>
      <Icon className="h-3 w-3" aria-hidden />
      {statusLabel[status]}
    </Badge>
  );
}

export function statusIcon(status: RunStatus) {
  switch (status) {
    case 'success':
      return CheckCircle2;
    case 'failed':
      return XCircle;
    case 'running':
      return Play;
    case 'waiting-maintenance':
      return Pause;
    case 'production-locked':
      return Lock;
    case 'queued':
      return CircleDashed;
    default:
      return CircleDot;
  }
}
