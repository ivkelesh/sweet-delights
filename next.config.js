module.exports = {
  experimental: {
    serverActions: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msg.datadrive.dev",
        port: "",
        pathname: "**",
      },
    ],
  },
};
