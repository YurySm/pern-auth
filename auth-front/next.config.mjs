/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL: process.env.SERVER_URL,
        APP_URL :process.env.APP_URL
    },
    webpack: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        }
        return config
    },
    images: {
        domains: ['avatars.githubusercontent.com']
    }
};

export default nextConfig;
