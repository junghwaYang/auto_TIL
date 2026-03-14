import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/auto_TIL",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
