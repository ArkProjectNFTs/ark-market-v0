/** @type {import('next').NextConfig} */
/** @type {import "./src/env.mjs"} */

const nextConfig = {
  transpilePackages: ["@ark-project/ark-modal"],
  webpack: (config) => {
    config.externals.push("encoding");
    return config;
  }
};

module.exports = nextConfig;
