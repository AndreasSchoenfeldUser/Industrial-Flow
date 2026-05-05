import type { Pipeline } from '@industrialflow/types';
import { pipelines } from './data/pipelines';

export interface PipelineProvider {
  list(): Promise<Pipeline[]>;
  get(id: string): Promise<Pipeline | null>;
  streamRun(id: string): AsyncIterable<Pipeline>;
}

export class MockPipelineProvider implements PipelineProvider {
  private snapshot: Pipeline[];

  constructor(initial: Pipeline[] = pipelines) {
    this.snapshot = initial.map((p) => ({ ...p }));
  }

  async list(): Promise<Pipeline[]> {
    return this.snapshot.map((p) => ({ ...p }));
  }

  async get(id: string): Promise<Pipeline | null> {
    const found = this.snapshot.find((p) => p.id === id);
    return found ? { ...found } : null;
  }

  // In Phase 1 ein einmaliger Yield. Phase 2 ersetzt dies durch SSE/WebSocket.
  async *streamRun(id: string): AsyncIterable<Pipeline> {
    const found = this.snapshot.find((p) => p.id === id);
    if (found) yield { ...found };
  }
}

export const mockPipelineProvider: PipelineProvider = new MockPipelineProvider();
