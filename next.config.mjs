/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  devIndicators: false,
  rewrites: async () => {
    return [
      {
        // This captures any request starting with /api/python/
        source: '/api/python/:path*',
        // In development, it points to your local Uvicorn server (usually port 8000)
        // In production (Vercel), it points to the actual file location
        destination: process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8000/api/python/:path*'
          : '/api/python/main.py', 
      },
    ];
  },
};

export default nextConfig;