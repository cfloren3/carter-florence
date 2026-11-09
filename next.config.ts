import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 npm run build  →  a fully static copy in /out with relative
 * asset paths, so it can be hosted at any URL (used for the shareable preview).
 * Normal builds and `npm run dev` are unaffected.
 */
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  devIndicators: false,
  ...(isExport
    ? {
        output: "export",
        assetPrefix: ".",
        images: { loader: "custom", loaderFile: "./src/lib/relative-image-loader.ts" },
      }
    : { images: { formats: ["image/avif", "image/webp"] } }),
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
