import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import WindiCSS from 'vite-plugin-windicss'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), WindiCSS()],
  server: {
    // Listening on all local IPs
    host: true,
    https: false,
    port: 3100,
    // // Load proxy configuration from .env
    proxy: {
      // 接口中存在/api字段时,自动代理到3001端口
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      },
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/'
      }
    ]
  },
  css: {
    // 预处理程序
    preprocessorOptions: {
      less: {
        // 是否开启
        javascriptEnabled: true,
        // 编译的额外的数据或设置
        additionalData: `@import "${fileURLToPath(
          new URL('./src/design/index.less', import.meta.url)
        )}";`
      }
    }
  }
})
