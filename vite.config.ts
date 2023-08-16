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
    port: 3101,
    // // Load proxy configuration from .env
    proxy: {
      // 接口中存在/study字段时,自动代理到3001端口，如果整个项目的接口都需要代理同一个端口，可以直接在axios实例那里设置/study为基础路径
      '/study': {
        target: 'http://127.0.0.1:3001/',
        changeOrigin: true,
        rewrite: (path) => {
          // 清除前端接口中的study字段,因为在后台的路由定义中实际上是没有study的
          return path.replace(/^\/study/, '')
        }
        // 可以拦截接口中存在study字段的接口,手动修改http状态码,手动返回数据
        // bypass: (req, res) => {
        //   res.writeHead(500, {
        //     'Content-Type': 'text/plain'
        //   })
        //   res.end('Proxy Error: ')
        // }
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
