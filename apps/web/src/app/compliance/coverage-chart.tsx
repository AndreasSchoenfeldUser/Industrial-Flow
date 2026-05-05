'use client';

// Client component because Recharts is a client-only library.
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ComplianceReport } from '@industrialflow/types';

export function CoverageChart({ reports }: { reports: ComplianceReport[] }) {
  const data = reports.map((r) => ({
    name: r.standard,
    coverage: r.coverage,
  }));
  return (
    <div className="h-56 rounded-[var(--radius-lg)] border bg-[color:var(--color-panel)]/50 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2c4a" />
          <XAxis dataKey="name" stroke="#97a2b8" fontSize={11} />
          <YAxis stroke="#97a2b8" fontSize={11} domain={[0, 100]} unit="%" />
          <Tooltip
            cursor={{ fill: 'rgba(255,91,19,0.08)' }}
            contentStyle={{
              background: '#16223c',
              border: '1px solid #1f2c4a',
              borderRadius: 10,
              fontSize: 12,
            }}
          />
          <Bar dataKey="coverage" fill="#ff5b13" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
