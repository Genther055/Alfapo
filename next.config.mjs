/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/print',
        destination: '/products',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
