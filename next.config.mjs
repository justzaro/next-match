/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**'
            } 
        ]
    },
    experimental: {
        staleTimes: {
            dynamic: 0
        }
    }
};

export default nextConfig;