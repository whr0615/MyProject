/*
 * @Author: Dr.Dong
 * @CreateDate: Do not edit
 * @Description: 
 */

// ref: https://umijs.org/config/

import { defineConfig } from 'umi';
import routes from './config/route.config';
const path = require('path');

export default defineConfig({
  hash: true,
  alias: {
    '@xm-component': path.join(__dirname, 'xm-common', 'components'),
    '@xm-utils': path.join(__dirname, 'xm-common', 'utils')
  },
  targets: {
    ie: 11, // 支持IE11
  },
  routes,
  chunks: ['react', 'react-dom', 'echarts', 'antd', 'vendors', 'umi'],
  chainWebpack(config) {
    config.optimization.splitChunks({
      chunks: "all", //async异步代码分割 initial同步代码分割 all同步异步分割都开启
      automaticNameDelimiter: "～",
      // name: true,
      minSize: 30000, //字节 引入的文件大于30kb才进行分割
      //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1, //模块至少使用次数
      // maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
      // maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
      // name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: {
        react: {
          name: "react",
          test: /[\\/]node_modules[\\/](react)[\\/]/,
          priority: -9,
          enforce: true,
        },
        reactDom: {
          name: "react-dom",
          test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
          priority: -9,
          enforce: true,
        },
        echarts: {
          name: "echarts",
          test: /[\\/]node_modules[\\/](echarts)[\\/]/,
          priority: -9,
          enforce: true,
        },
        antd: {
          name: "antd",
          test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
          priority: -10,
          enforce: true,
        },
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -11,
          enforce: true,
        },
      },
    });
  },
  webpack5: {}
})