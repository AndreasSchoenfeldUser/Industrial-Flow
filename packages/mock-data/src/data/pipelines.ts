import type { Pipeline, Stage } from '@industrialflow/types';

const itStages = (
  statuses: Stage['status'][],
  durations: (number | undefined)[],
): Stage[] => {
  const names = [
    'Checkout',
    'Lint & Static Analysis',
    'Build & Unit Test',
    'SBOM (CycloneDX+SPDX)',
    'Container Sign & Push',
  ];
  return names.map((name, i) => ({
    name,
    phase: 'it',
    status: statuses[i] ?? 'pending',
    durationMs: durations[i],
  }));
};

const otStages = (
  statuses: Stage['status'][],
  durations: (number | undefined)[],
): Stage[] => {
  const names = [
    'OPC-UA Pre-Check',
    'Maintenance Window Gate',
    'Blue-Green Deploy',
    'Smoke Test on Cell',
    'Production Cut-Over',
  ];
  return names.map((name, i) => ({
    name,
    phase: 'ot',
    status: statuses[i] ?? 'pending',
    durationMs: durations[i],
  }));
};

const minutesAgo = (m: number) =>
  new Date(Date.now() - m * 60_000).toISOString();

export const pipelines: Pipeline[] = [
  {
    id: 'firmware-cnc-mills',
    name: 'Firmware CNC Mills',
    runNumber: 142,
    branch: 'main',
    commit: 'a3f81b2',
    triggeredBy: 'andreas',
    startedAt: minutesAgo(7),
    status: 'running',
    site: 'sindelfingen',
    targetType: 'cnc',
    stages: [
      ...itStages(
        ['success', 'success', 'success', 'success', 'success'],
        [12_000, 41_000, 184_000, 22_000, 18_000],
      ),
      ...otStages(
        ['success', 'success', 'running', 'pending', 'pending'],
        [3_000, 1_000, undefined, undefined, undefined],
      ),
    ],
    targets: [
      {
        id: 'CNC-01',
        type: 'cnc',
        hall: 'Werk Sindelfingen / Halle 4',
        status: 'updated',
        currentVersion: '4.7.1',
        targetVersion: '4.7.1',
        activeSlot: 'green',
        opcua: {
          machineState: 'idle',
          spindleRpm: 0,
          safetyDoor: 'closed',
          lastJobEndedAt: minutesAgo(11),
        },
      },
      {
        id: 'CNC-02',
        type: 'cnc',
        hall: 'Werk Sindelfingen / Halle 4',
        status: 'updating',
        currentVersion: '4.6.9',
        targetVersion: '4.7.1',
        progress: 62,
        activeSlot: 'blue',
        opcua: {
          machineState: 'idle',
          spindleRpm: 0,
          safetyDoor: 'closed',
        },
      },
      {
        id: 'CNC-03',
        type: 'cnc',
        hall: 'Werk Sindelfingen / Halle 4',
        status: 'pending',
        currentVersion: '4.6.9',
        targetVersion: '4.7.1',
        opcua: {
          machineState: 'idle',
          spindleRpm: 0,
          safetyDoor: 'closed',
        },
      },
      {
        id: 'CNC-04',
        type: 'cnc',
        hall: 'Werk Sindelfingen / Halle 5',
        status: 'pending',
        currentVersion: '4.6.9',
        targetVersion: '4.7.1',
        opcua: {
          machineState: 'idle',
          spindleRpm: 0,
          safetyDoor: 'closed',
        },
      },
    ],
    sbomGeneratedAt: minutesAgo(5),
  },
  {
    id: 'plc-logic-deploy',
    name: 'PLC Logic Deploy',
    runNumber: 87,
    branch: 'release/2026-q2',
    commit: '7c2d014',
    triggeredBy: 'andreas',
    startedAt: minutesAgo(78),
    finishedAt: minutesAgo(64),
    durationMs: 14 * 60_000,
    status: 'success',
    site: 'sindelfingen',
    targetType: 'plc',
    stages: [
      ...itStages(
        ['success', 'success', 'success', 'success', 'success'],
        [9_000, 21_000, 96_000, 18_000, 14_000],
      ),
      ...otStages(
        ['success', 'success', 'success', 'success', 'success'],
        [4_000, 2_000, 240_000, 88_000, 12_000],
      ),
    ],
    targets: [
      {
        id: 'PLC-7',
        type: 'plc',
        hall: 'Werk Sindelfingen / Halle 2',
        status: 'updated',
        currentVersion: '2.14.0',
        targetVersion: '2.14.0',
        activeSlot: 'green',
      },
      {
        id: 'PLC-8',
        type: 'plc',
        hall: 'Werk Sindelfingen / Halle 2',
        status: 'updated',
        currentVersion: '2.14.0',
        targetVersion: '2.14.0',
        activeSlot: 'green',
      },
    ],
    sbomGeneratedAt: minutesAgo(70),
  },
  {
    id: 'hmi-rollout',
    name: 'HMI Touchpanel Rollout',
    runNumber: 33,
    branch: 'feat/de-translations',
    commit: 'b1198cf',
    triggeredBy: 'andreas',
    startedAt: minutesAgo(212),
    finishedAt: minutesAgo(207),
    durationMs: 5 * 60_000,
    status: 'failed',
    site: 'bremen',
    targetType: 'hmi',
    stages: [
      ...itStages(
        ['success', 'success', 'success', 'success', 'success'],
        [10_000, 33_000, 120_000, 19_000, 16_000],
      ),
      ...otStages(
        ['success', 'success', 'failed', 'skipped', 'skipped'],
        [2_500, 1_200, 71_000, undefined, undefined],
      ),
    ],
    targets: [
      {
        id: 'HMI-3',
        type: 'hmi',
        hall: 'Werk Bremen / Halle 1',
        status: 'pending',
        currentVersion: '1.8.4',
        targetVersion: '1.9.0',
      },
      {
        id: 'HMI-4',
        type: 'hmi',
        hall: 'Werk Bremen / Halle 1',
        status: 'pending',
        currentVersion: '1.8.4',
        targetVersion: '1.9.0',
      },
    ],
  },
  {
    id: 'robot-firmware',
    name: 'KUKA Robot Firmware',
    runNumber: 21,
    branch: 'main',
    commit: '4d77e08',
    triggeredBy: 'andreas',
    startedAt: minutesAgo(34),
    status: 'waiting-maintenance',
    site: 'rastatt',
    targetType: 'robot',
    stages: [
      ...itStages(
        ['success', 'success', 'success', 'success', 'success'],
        [11_000, 27_000, 142_000, 21_000, 17_000],
      ),
      ...otStages(
        ['success', 'pending', 'pending', 'pending', 'pending'],
        [3_500, undefined, undefined, undefined, undefined],
      ),
    ],
    targets: [
      {
        id: 'ROB-12',
        type: 'robot',
        hall: 'Werk Rastatt / Halle 7',
        status: 'pending',
        currentVersion: '6.2.1',
        targetVersion: '6.3.0',
      },
      {
        id: 'ROB-13',
        type: 'robot',
        hall: 'Werk Rastatt / Halle 7',
        status: 'pending',
        currentVersion: '6.2.1',
        targetVersion: '6.3.0',
      },
    ],
    sbomGeneratedAt: minutesAgo(30),
  },
  {
    id: 'edge-gateway',
    name: 'Edge Gateway Image',
    runNumber: 58,
    branch: 'main',
    commit: 'e0a9c11',
    triggeredBy: 'andreas',
    startedAt: minutesAgo(18),
    status: 'production-locked',
    site: 'sindelfingen',
    targetType: 'edge',
    stages: [
      ...itStages(
        ['success', 'success', 'success', 'success', 'success'],
        [8_000, 19_000, 78_000, 16_000, 13_000],
      ),
      ...otStages(
        ['failed', 'skipped', 'skipped', 'skipped', 'skipped'],
        [4_200, undefined, undefined, undefined, undefined],
      ),
    ],
    targets: [
      {
        id: 'EDGE-01',
        type: 'edge',
        hall: 'Werk Sindelfingen / Halle 4',
        status: 'locked',
        currentVersion: '3.0.4',
        targetVersion: '3.1.0',
        opcua: {
          machineState: 'running',
          spindleRpm: 8400,
          safetyDoor: 'closed',
        },
      },
    ],
  },
  {
    id: 'press-line-config',
    name: 'Pressenstraße Konfiguration',
    runNumber: 12,
    branch: 'feat/press-pressure-curve',
    commit: '2b6f0a4',
    triggeredBy: 'andreas',
    startedAt: minutesAgo(2),
    status: 'queued',
    site: 'bremen',
    targetType: 'plc',
    stages: [
      ...itStages(
        ['pending', 'pending', 'pending', 'pending', 'pending'],
        [undefined, undefined, undefined, undefined, undefined],
      ),
      ...otStages(
        ['pending', 'pending', 'pending', 'pending', 'pending'],
        [undefined, undefined, undefined, undefined, undefined],
      ),
    ],
    targets: [
      {
        id: 'PLC-21',
        type: 'plc',
        hall: 'Werk Bremen / Halle 3',
        status: 'pending',
        currentVersion: '1.2.0',
        targetVersion: '1.3.0',
      },
    ],
  },
];
