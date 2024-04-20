// module.exports = {
//   images: {
//     domains: ["image.tmdb.org"],
//   },
// };
/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["image.tmdb.org"],
  },
  swcMinify: true,
};

export default withPlaiceholder(nextConfig);
