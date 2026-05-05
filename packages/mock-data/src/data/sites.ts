import type { Site } from '@industrialflow/types';

export const sites: Site[] = [
  {
    id: 'sindelfingen',
    name: 'Werk Sindelfingen',
    airGapped: false,
    otProxy: 'online',
  },
  {
    id: 'bremen',
    name: 'Werk Bremen',
    airGapped: true,
    otProxy: 'online',
  },
  {
    id: 'rastatt',
    name: 'Werk Rastatt',
    airGapped: true,
    otProxy: 'degraded',
  },
];
