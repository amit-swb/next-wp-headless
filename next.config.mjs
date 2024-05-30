/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'https://next-wp-headless-cms.vercel.app'],
    },
};

export default nextConfig;
