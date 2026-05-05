import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Pipeline } from '@industrialflow/types';
import { PipelineList } from './pipeline-list';

const pipeline: Pipeline = {
  id: 'demo',
  name: 'Demo Pipeline',
  runNumber: 7,
  branch: 'main',
  commit: 'abcdef0',
  triggeredBy: 'andreas',
  startedAt: new Date(Date.now() - 60_000).toISOString(),
  status: 'running',
  site: 'sindelfingen',
  targetType: 'cnc',
  stages: [],
  targets: [
    {
      id: 'CNC-99',
      type: 'cnc',
      hall: 'Werk Sindelfingen / Halle 4',
      status: 'updating',
      currentVersion: '1.0.0',
    },
  ],
};

describe('PipelineList', () => {
  it('renders pipeline name, run number, and links to detail page', () => {
    render(<PipelineList pipelines={[pipeline]} />);
    expect(screen.getByText('Demo Pipeline')).toBeInTheDocument();
    expect(screen.getByText('#7')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/pipelines/demo');
  });

  it('shows German status label', () => {
    render(<PipelineList pipelines={[pipeline]} />);
    expect(screen.getByText('Läuft')).toBeInTheDocument();
  });
});
