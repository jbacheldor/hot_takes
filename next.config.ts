import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

// Expose base URL to client
module.exports = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.BASE_URL,
    }
}

export default nextConfig;
