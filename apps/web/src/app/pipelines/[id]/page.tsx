import { notFound } from 'next/navigation';
import {
  mockPipelineProvider,
  opcuaPreCheckLog,
} from '@industrialflow/mock-data';
import { StatusBadge } from '@/components/status';
import { StageFlow } from '@/components/stage-flow';
import { DeploymentMatrix } from '@/components/deployment-matrix';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/format';
import { GitBranch, GitCommit, RotateCcw, User } from 'lucide-react';
import Link from 'next/link';

export default async function PipelineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pipeline = await mockPipelineProvider.get(id);
  if (!pipeline) notFound();

  const itStages = pipeline.stages.filter((s) => s.phase === 'it');
  const otStages = pipeline.stages.filter((s) => s.phase === 'ot');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/pipelines"
            className="text-xs text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]"
          >
            ← Pipelines
          </Link>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">
            {pipeline.name}{' '}
            <span className="text-[color:var(--color-fg-dim)]">
              #{pipeline.runNumber}
            </span>
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[color:var(--color-fg-muted)]">
            <span className="inline-flex items-center gap-1">
              <GitBranch className="h-3 w-3" aria-hidden />
              {pipeline.branch}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitCommit className="h-3 w-3" aria-hidden />
              {pipeline.commit}
            </span>
            <span className="inline-flex items-center gap-1">
              <User className="h-3 w-3" aria-hidden />
              {pipeline.triggeredBy}
            </span>
            <span>Start: {formatDateTime(pipeline.startedAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={pipeline.status} />
          <Button variant="secondary">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Erneut starten
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4">
        <StageFlow
          title="IT-Phase"
          subtitle="Build, Test, SBOM, Image-Signatur"
          stages={itStages}
        />
        <StageFlow
          title="OT-Phase"
          subtitle="OPC-UA Pre-Check, Wartungsfenster, Blue-Green-Cut-Over"
          stages={otStages}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
          Deployment-Matrix
        </h2>
        <DeploymentMatrix targets={pipeline.targets} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
          OPC-UA Pre-Check Log
        </h2>
        <pre className="overflow-x-auto rounded-[var(--radius-lg)] border bg-black/40 p-4 font-mono text-[11px] leading-relaxed text-[color:var(--color-fg)] scrollbar-thin">
          {opcuaPreCheckLog(pipeline.id)}
        </pre>
      </section>
    </div>
  );
}
