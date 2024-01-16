/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utmstorageaccount.blob.core.windows.net",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "confectioneryplatform.azurewebsites.net",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
