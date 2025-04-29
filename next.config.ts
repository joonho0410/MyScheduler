import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/Style')], // 'src/Style' 폴더를 절대 경로로 지정
  },
};

export default nextConfig;
