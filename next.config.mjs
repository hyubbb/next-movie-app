import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["image.tmdb.org"],
    unoptimized: true,
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPlaiceholder(nextConfig);
