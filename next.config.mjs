
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-7d937c7331834e4a9e6d3a588b9bfa59.r2.dev",
        pathname: "/**",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
