import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import pxtorem from 'postcss-pxtorem';
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./mock",
    }),
  ],
  // TODO: 代理
  // server: {
  //   host: '127.0.0.1',
  //   port: 3000,
  //   proxy: {
  //     '/mock': {
  //       target: 'http://127.0.0.1:8888',	
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     },
  //   }
  // },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/index.scss";',
      }
    },
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 37.5,
          propList: ['*'],
          selectorBlackList: []
        })
      ]
      
    }
  }

})
