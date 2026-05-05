export type MaintenanceWindow = {
  id: string;
  site: string;
  pipelineId?: string;
  timezone: string;
  weekday: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  from: string;
  to: string;
  // Nächster konkreter Beginn als ISO-String, wird vom Mock-Provider berechnet.
  nextStartAt: string;
  active: boolean;
};

export type AssistantMessageRole = 'assistant' | 'user' | 'system';

export type AssistantMessage = {
  id: string;
  role: AssistantMessageRole;
  content: string;
  timestamp: string;
};

export type AssistantSuggestedAction = {
  id: string;
  label: string;
  description: string;
  // Phase 3 hängt hier reale Tool-Calls an (analyze-failure, generate-pipeline, ...).
  intent: 'analyze-failure' | 'generate-pipeline' | 'risk-score' | 'open-pipeline';
  pipelineId?: string;
};

export type Site = {
  id: string;
  name: string;
  airGapped: boolean;
  otProxy: 'online' | 'degraded' | 'offline';
};
