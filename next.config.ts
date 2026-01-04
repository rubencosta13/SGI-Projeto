import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  compress: true,
  cleanDistDir: true,
  poweredByHeader: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] } // keep warn if you want, or remove it too
        : false,
  },
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
      preventFullImport: true,
    },
    three: { transform: "three/{{member}}" },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    webpackMemoryOptimizations: true,
    optimizeServerReact: true,
  },
};

export default nextConfig;
