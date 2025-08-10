/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Vercel 최적화
  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk']
  },
  // 환경변수 런타임 체크
  env: {
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  },
  // 정적 자원 최적화
  images: {
    domains: ['example.com']
  }
};

module.exports = nextConfig;