export type MachineType = 'cnc' | 'plc' | 'hmi' | 'edge' | 'robot';

export type MachineStatus =
  | 'idle'
  | 'running-production'
  | 'updating'
  | 'updated'
  | 'pending'
  | 'locked';

export type OpcUaSnapshot = {
  machineState: 'idle' | 'running' | 'fault';
  spindleRpm: number;
  safetyDoor: 'open' | 'closed';
  lastJobEndedAt?: string;
};

export type MachineTarget = {
  id: string;
  type: MachineType;
  hall: string;
  status: MachineStatus;
  currentVersion: string;
  targetVersion?: string;
  progress?: number;
  opcua?: OpcUaSnapshot;
  // Blue-Green-Slot. Wird in Phase 4 vom OT-Proxy-Agent gepflegt.
  activeSlot?: 'blue' | 'green';
};
