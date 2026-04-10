/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  devIndicators: false,
  rewrites: async () => {
    return [
      {
        source: '/python/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8000/:path*' // Your local Fastapi port
          : '/api/route.py',               // Vercel Function
      },
    ];
  },
};

export default nextConfig;