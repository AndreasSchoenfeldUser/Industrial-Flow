import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@industrialflow/types', '@industrialflow/mock-data'],
};

export default nextConfig;
