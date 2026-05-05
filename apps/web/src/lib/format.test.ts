import { describe, expect, it } from 'vitest';
import { formatDuration } from './format';

describe('formatDuration', () => {
  it('returns dash for undefined', () => {
    expect(formatDuration(undefined)).toBe('–');
  });

  it('formats sub-second values in ms', () => {
    expect(formatDuration(450)).toBe('450 ms');
  });

  it('formats seconds', () => {
    expect(formatDuration(8_400)).toBe('8 s');
  });

  it('formats minutes with seconds', () => {
    expect(formatDuration(3 * 60_000 + 12_000)).toBe('3 min 12 s');
  });

  it('formats hours with minutes', () => {
    expect(formatDuration(2 * 60 * 60_000 + 5 * 60_000)).toBe('2 h 5 min');
  });
});
