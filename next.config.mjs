const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos"
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc"
      }
    ]
  }
};

export default nextConfig;
