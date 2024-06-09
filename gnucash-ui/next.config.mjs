/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
import withMDX  from '@next/mdx'


const bundleAnalyzer =withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default bundleAnalyzer(withMDX()(nextConfig))

