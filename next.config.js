/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_RPC_URL: "https://dream-rpc.somnia.network/",
    NEXT_PUBLIC_CHAIN_ID: "50312",
    NEXT_PUBLIC_BLOCK_EXPLORER: "https://shannon-explorer.somnia.network/",
    NEXT_PUBLIC_TOKEN_SYMBOL: "STT",
  },
  images: {
    domains: ["raw.githubusercontent.com", "somnia.network"], // Để hiển thị logo token nếu cần
  },
};

module.exports = nextConfig;
