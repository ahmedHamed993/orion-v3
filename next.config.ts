import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sadeem-orion.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sadeem-orion.com",
        port: "",
        pathname: "/**/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
