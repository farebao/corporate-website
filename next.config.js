/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 关键：和你的仓库名完全一致
  basePath: '/corporate-website',
  assetPrefix: '/corporate-website/',
  trailingSlash: true,
  images: {
    unoptimized: true, // 静态导出必须关闭图片优化
  },

};

module.exports = nextConfig;