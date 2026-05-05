import { describe, expect, it } from 'vitest';
import { MockPipelineProvider } from './providers';
import { pipelines } from './data/pipelines';

describe('MockPipelineProvider', () => {
  it('returns all seeded pipelines', async () => {
    const provider = new MockPipelineProvider();
    const all = await provider.list();
    expect(all).toHaveLength(pipelines.length);
  });

  it('returns null for unknown pipeline ids', async () => {
    const provider = new MockPipelineProvider();
    expect(await provider.get('does-not-exist')).toBeNull();
  });

  it('returns a deep-ish copy so callers cannot mutate seed data', async () => {
    const provider = new MockPipelineProvider();
    const a = await provider.get('firmware-cnc-mills');
    expect(a).not.toBeNull();
    if (a) a.runNumber = 999;
    const b = await provider.get('firmware-cnc-mills');
    expect(b?.runNumber).not.toBe(999);
  });

  it('yields the current snapshot from streamRun', async () => {
    const provider = new MockPipelineProvider();
    const seen: string[] = [];
    for await (const run of provider.streamRun('plc-logic-deploy')) {
      seen.push(run.id);
    }
    expect(seen).toEqual(['plc-logic-deploy']);
  });
});
