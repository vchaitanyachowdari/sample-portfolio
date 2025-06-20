import mdx from "@next/mdx";
import withPWA from "next-pwa";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default withPWA(pwaConfig)(withMDX(nextConfig));
