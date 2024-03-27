/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.ouedkniss.com",
      },
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        hostname: "github.com",
      },
    ],
  },
};

export default nextConfig;
