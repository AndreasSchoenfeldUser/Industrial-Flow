import type { NextConfig } from 'next';
import path from 'node:path';

// outputFileTracingRoot points Next.js at the monorepo root so the standalone
// build correctly bundles the @industrialflow/* workspace packages.
const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(process.cwd(), '../..'),
  reactStrictMode: true,
  transpilePackages: ['@industrialflow/types', '@industrialflow/mock-data'],
};

export default nextConfig;
