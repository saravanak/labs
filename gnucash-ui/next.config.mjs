/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
import withMDX from '@next/mdx';
import withSerwistInit from '@serwist/next';
import crypto from 'node:crypto';

const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: 'src/app/sw.ts',
  cacheOnNavigation: true,
  swDest: 'public/sw.js',
  disable: true,
  additionalPrecacheEntries: [{ url: '/~offline', revision }],
});

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false
};

// export default bundleAnalyzer(withSerwist(withMDX()(nextConfig)));
export default withSerwist(withMDX()(nextConfig));
