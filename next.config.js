/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/makeoffer',
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
      '/makeoffer': { page: '/makeoffer' },
      '/offer': { page: '/offer' },
      // '/calendar': { page: '/calendar' },Holding: calendar logic
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
