/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "muntaj.s3.eu-central-1.amazonaws.com",
      },
      {
        hostname: "github.com",
      },
    ],
  },
};

export default nextConfig;
