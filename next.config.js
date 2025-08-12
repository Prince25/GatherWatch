/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint configuration - which directories to check during build
  eslint: {
    dirs: ["app", "components", "lib", "types"],
  },
  // Image optimization - allow external domains for movie posters/thumbnails
  images: {
    domains: ["image.tmdb.org", "img.youtube.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org", // TMDB movie posters
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com", // YouTube thumbnails
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
