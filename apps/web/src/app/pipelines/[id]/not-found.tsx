import Link from 'next/link';

export default function PipelineNotFound() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed p-10 text-center">
      <h1 className="text-lg font-semibold">Pipeline nicht gefunden</h1>
      <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
        Diese Pipeline-ID existiert in den Mock-Daten nicht.
      </p>
      <Link
        href="/pipelines"
        className="mt-4 inline-block text-sm text-[color:var(--color-accent)] hover:underline"
      >
        ← Zur Pipeline-Liste
      </Link>
    </div>
  );
}
