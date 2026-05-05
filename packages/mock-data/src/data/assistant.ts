import type { AssistantMessage, AssistantSuggestedAction } from '@industrialflow/types';

const minutesAgo = (m: number) =>
  new Date(Date.now() - m * 60_000).toISOString();

export const assistantConversation: AssistantMessage[] = [
  {
    id: 'm-1',
    role: 'system',
    content:
      'Modus: Online (Anthropic). Logs werden vor Übertragung gescrubbt (Hostnamen, IPs, Personennamen).',
    timestamp: minutesAgo(20),
  },
  {
    id: 'm-2',
    role: 'user',
    content: 'Warum hat „HMI Touchpanel Rollout" #33 in der Stage Blue-Green Deploy abgebrochen?',
    timestamp: minutesAgo(15),
  },
  {
    id: 'm-3',
    role: 'assistant',
    content:
      'Ursache laut OT-Proxy-Log: Die HMI-3 in Halle 1 erwartet Auflösung 1280×800, das gebaute Image liefert 1024×768. Empfehlung: Profil hmi/halle-1 in der Pipeline-Definition anpassen oder Build-Argument HMI_RES auf 1280x800 setzen. Soll ich einen Pipeline-Patch vorschlagen?',
    timestamp: minutesAgo(14),
  },
  {
    id: 'm-4',
    role: 'user',
    content: 'Welches Risiko hat das aktuelle Deployment der Firmware-CNC-Mills?',
    timestamp: minutesAgo(2),
  },
  {
    id: 'm-5',
    role: 'assistant',
    content:
      'Risk-Score: niedrig (2/10). 4 Maschinen, alle in Halle 4/5 Sindelfingen, OPC-UA meldet idle, Spindle 0 RPM, Sicherheitstür geschlossen. Wartungsfenster ist nicht erforderlich, da Blue-Green Slot auf grün liegt. Rollback-Pfad: aktiver Slot blau bleibt erhalten.',
    timestamp: minutesAgo(1),
  },
];

export const assistantSuggestedActions: AssistantSuggestedAction[] = [
  {
    id: 'sa-1',
    label: 'HMI-Pipeline reparieren',
    description: 'Build-Arg HMI_RES=1280x800 vorschlagen',
    intent: 'generate-pipeline',
    pipelineId: 'hmi-rollout',
  },
  {
    id: 'sa-2',
    label: 'Risk-Score CNC-Mills aktualisieren',
    description: 'Erneute Bewertung nach Stage „Smoke Test"',
    intent: 'risk-score',
    pipelineId: 'firmware-cnc-mills',
  },
  {
    id: 'sa-3',
    label: 'Edge-Gateway analysieren',
    description: 'Production-Lock klären (EDGE-01 läuft)',
    intent: 'analyze-failure',
    pipelineId: 'edge-gateway',
  },
];
