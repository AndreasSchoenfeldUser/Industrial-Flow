import { mockPipelineProvider, sites } from '@industrialflow/mock-data';
import { PipelineFilters } from './pipeline-filters';

export default async function PipelinesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; site?: string; targetType?: string; sort?: string }>;
}) {
  const params = await searchParams;
  let pipelines = await mockPipelineProvider.list();

  if (params.status) {
    pipelines = pipelines.filter((p) => p.status === params.status);
  }
  if (params.site) {
    pipelines = pipelines.filter((p) => p.site === params.site);
  }
  if (params.targetType) {
    pipelines = pipelines.filter((p) => p.targetType === params.targetType);
  }

  pipelines.sort((a, b) => {
    if (params.sort === 'name') return a.name.localeCompare(b.name, 'de');
    return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();
  });

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight">Pipelines</h1>
        <p className="text-sm text-[color:var(--color-fg-muted)]">
          Filtern Sie nach Status, Werk oder Ziel-Typ. Sortierung über die Auswahl rechts.
        </p>
      </header>

      <PipelineFilters
        sites={sites}
        active={{
          status: params.status,
          site: params.site,
          targetType: params.targetType,
          sort: params.sort,
        }}
        pipelines={pipelines}
      />
    </div>
  );
}
