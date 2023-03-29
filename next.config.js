/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
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
      '/customer': { page: '/customer' },
      '/reward': { page: '/reward' },
      '/support': { page: '/support' },
    };
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
};

module.exports = nextConfig;
