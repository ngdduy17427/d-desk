import type { NextConfig } from 'next'
import path from 'node:path'

const cspHeader = `
  default-src 'self';
  connect-src 'self' https://duhi-home.ddns.net wss://duhi-home.ddns.net;
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self' https://fonts.gstatic.com https://cdn.example.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  experimental: {
    externalDir: true,
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.resolve.alias['@laguz'] = path.resolve(__dirname, '../libs/laguz')
    return config
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

// eslint-disable-next-line import/no-default-export
export default nextConfig
