import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
        protocol: "https",
      },
    ],
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPlaiceholder(nextConfig);
