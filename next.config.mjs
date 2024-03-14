/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});
const nextConfig = withPWA({});

export default nextConfig;
