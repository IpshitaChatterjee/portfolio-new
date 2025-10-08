import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  eslint: {
    // Avoid failing the build on ESLint issues during deployment
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source:
          '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
        destination: '/blog/broadband-labels',
        permanent: true,
      },
    ];
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});


export default withMDX(nextConfig);
