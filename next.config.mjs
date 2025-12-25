/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://www.gstatic.com; img-src 'self' blob: data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://generativelanguage.googleapis.com wss://generativelanguage.googleapis.com https://api.groq.com https://cloud.appwrite.io https://fra.cloud.appwrite.io ws://localhost:*;"
                    }
                ],
            },
        ];
    },
};

export default nextConfig;
