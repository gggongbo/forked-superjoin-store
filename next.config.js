/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  publicExcludes: ['!robots.txt'],
});

const nextConfig = withPWA({
  reactStrictMode: true,
  trailingSlash: true,
  devIndicators: {
    buildActivity: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/createCall',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async exportPathMap() {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/createCall': { page: '/createCall' },
      '/call': { page: '/call' },
      '/member': { page: '/member' },
      '/reward': { page: '/reward' },
      '/support': { page: '/support' },
    };
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
});

module.exports = nextConfig;
