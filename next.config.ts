import type { NextConfig } from 'next';

// Für GitHub Pages wird NEXT_PUBLIC_BASE_PATH im Workflow auf "/<repo>" gesetzt.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
  },
};

export default nextConfig;
