/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**', // autorise toutes les tailles (w500, original, etc.)
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/200x300', // ou '/**' si tu veux autoriser toutes les tailles/paths
      },
    ],
  },
  env: {
    TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN,
  },
};

export default nextConfig;
