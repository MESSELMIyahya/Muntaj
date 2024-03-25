/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"media.ouedkniss.com"
            },
            {
                hostname:'m.media-amazon.com'
            }
        ]
    }
};

export default nextConfig;
