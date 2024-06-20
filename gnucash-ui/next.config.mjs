/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";
import withMDX from "@next/mdx";
import * as withPWAFactory from "next-pwa";

const withPWA = withPWAFactory.default({
  dest: "public",
  mode: 'production'
});

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default withPWA(bundleAnalyzer(withMDX()(nextConfig)));

