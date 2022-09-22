// ref: https://umijs.org/config/
import { defineConfig } from 'umi';
import routes from './config/route.config';
const path = require('path');

export default defineConfig({
  define: {
    'process.env.API_PREFIX': 'apiv2',
  },
  alias: {
    '@xm-component': path.join(__dirname, 'xm-common', 'components'),
    '@xm-utils': path.join(__dirname, 'xm-common', 'utils'),
  },
  routes,
  // chunks: ['vendors', 'umi'],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    });
  },
  proxy: {
    '/apiv2': {
      /* target: 'http://localhost:6021',*/
      target: 'http://223.241.222.155:6021',
      changeOrigin: true,
      pathRewrite: {
        '^/apiv2': '',
      },
    },
    '/api': {
      target: 'http://223.241.222.155:6010',
      // target: "http://localhost:6010",
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },

    '/extend': {
      target: 'http://223.241.222.155:16400/extend',
      changeOrigin: true,
      pathRewrite: {
        '^/extend': '',
      },
    },
  },
});
