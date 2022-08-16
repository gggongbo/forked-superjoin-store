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
  // svg image를 component처럼 쓸수 있게하는 webpack config
  // webpack: config => {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     use: ['@svgr/webpack'],
  //   });

  //   return config;
  // },
};

module.exports = nextConfig;
