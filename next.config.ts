import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', trailingSlash: true, poweredByHeader: false, devIndicators: false, experimental: { globalNotFound: true }, images: { unoptimized: true } };
export default config;
