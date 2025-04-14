import path from 'path';

import type { NextConfig } from 'next';

import { i18n } from './next-i18next.config';

const nextConfig: NextConfig = {
  i18n,
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
