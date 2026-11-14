const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://stock.dev.vilhena.ifro.edu.br/api/:path*',
      },
    ];
  },
};

export default nextConfig;
