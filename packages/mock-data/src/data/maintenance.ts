import type { MaintenanceWindow } from '@industrialflow/types';

const hoursFromNow = (h: number) =>
  new Date(Date.now() + h * 60 * 60_000).toISOString();

export const maintenanceWindows: MaintenanceWindow[] = [
  {
    id: 'mw-sindelfingen-tue',
    site: 'sindelfingen',
    timezone: 'Europe/Berlin',
    weekday: 'tue',
    from: '02:00',
    to: '04:00',
    nextStartAt: hoursFromNow(11),
    active: false,
  },
  {
    id: 'mw-bremen-wed',
    site: 'bremen',
    timezone: 'Europe/Berlin',
    weekday: 'wed',
    from: '03:00',
    to: '05:00',
    nextStartAt: hoursFromNow(36),
    active: false,
  },
  {
    id: 'mw-rastatt-tue',
    site: 'rastatt',
    pipelineId: 'robot-firmware',
    timezone: 'Europe/Berlin',
    weekday: 'tue',
    from: '02:00',
    to: '04:00',
    nextStartAt: hoursFromNow(11),
    active: true,
  },
];
