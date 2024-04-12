import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import fs from 'fs'
import svgr from 'vite-plugin-svgr'
import Autoprefixer from 'autoprefixer'
import PostCssPxToRem from 'postcss-pxtorem'
import Tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // loadEnv中三个参数 (mode,dir,base) -> 返回一个包含环境变量的对象
  // mode: Vite的运行模式,通常是development 或 production
  // dir: 环境变量文件的查找目录,通常用 process.cwd() 获取当前工作目录
  // base:环境变量文件的基础名称,通常为空字符串,表示默认的 '.env' 文件
  const env: Record<string, string> = loadEnv(mode, process.cwd(), '') // 环境变量
  const isProd: boolean = env.VITE_APP_ENV === 'production'
  const isDev: boolean = env.VITE_APP_ENV === 'development'
  const isSit: boolean = env.VITE_APP_ENV === 'sit'
  const isHideLog: boolean = env.VITE_APP_LOG === 'true'

  let delDir: Function = (path: string) => { }
  // 非本地环境删除dist文件夹
  if (!isDev) {
    delDir = (path: string) => {
      let files: string[] = []
      if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(file => {
          let curPath: string = path + '/' + file
          // 判断是否是文件夹
          if (fs.statSync(curPath).isDirectory()) {
            delDir(curPath) //递归删除文件夹
          } else {
            // 是文件的话说明是最后一层不需要递归
            fs.unlinkSync(curPath) //删除文件
          }
        })
        fs.rmdirSync(path)
      } else {
        return false
      }
    }

    // 删除目录
    delDir('./dist')
    // delDir('./mobile')
  }

  // 区分测试和生产的打包环境
  let publicPath: string = ''
  let outputDir: string = ''

  // 测试使用dist打包
  if (isSit) {
    publicPath = env.VITE_APP_RESOURCE_URL as string
    outputDir = 'dist'
  }

  // 生产/预生产使用时间戳
  if (isProd) {
    // 前端打包解决缓存问题
    const formatDate = (): string => {
      const time: Date = new Date()
      let y: string = time.getFullYear().toString()
      let m: string = (time.getMonth() + 1).toString()
      let d: string = time.getDate().toString()
      let h: string = time.getHours().toString()
      let mm: string = time.getMinutes().toString()
      let ss: string = time.getSeconds().toString()
      m = Number(m) < 10 ? `0${m}` : m
      d = Number(d) < 10 ? `0${d}` : d
      h = Number(h) < 10 ? `0${h}` : h
      mm = Number(mm) < 10 ? `0${mm}` : mm
      return `${y}${m}${d}${h}${mm}${ss}`
    }
    const dirName: string = formatDate()
    // publicPath = `${env.VITE_APP_RESOURCE_URL}${dirName}`
    publicPath = `${env.VITE_APP_RESOURCE_URL}`
    if (isProd) {
      // outputDir = `./dist/${dirName}`
      outputDir = `./dist`
    }
  }


  return {
    base: publicPath,

    plugins: [
      react(),
      svgr()
    ],

    build: {
      outDir: outputDir,
      assetsDir: 'assets', // 指定生成静态文件目录 默认assets
      assetsInlineLimit: 1024 * 10, // 小于此阈值的导入或引用资源将内联为 base64 编码 默认4096
      cssCodeSplit: true, // 启用 CSS 代码拆分 默认true
      minify: 'esbuild', // 混淆器，terser构建后文件体积更小  // 默认esbuild 它比 terser 快 20-40 倍，压缩率只差 1%-2%
      // terserOptions: {
      //   compress: {
      //     // 生产环境时移除console.log调试代码 生产环境时移除
      //     drop_console: isHideLog,
      //     drop_debugger: isHideLog
      //   }
      // },
      rollupOptions: {
        output: { // 对打包的静态资源做处理
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id) { // 超大静态资源拆分
            if (id.includes('node_modules')) {
              const list = id.toString().split('node_modules/')
              return list[list.length - 1].split('/')[0].toString()
            }
          }
        }
      }
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },

    server: {
      port: 7788,
      host: '0.0.0.0',
      open: false,
      // https: false,
      strictPort: false, // 为true若端口已被占用则会直接退出
      proxy: {
        '/api': {
          target: env.VITE_APP_SERVE_URl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },

    css: {
      postcss: { // vite内配置postcss后 postcss.config.js失效
        plugins: [
          Autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8'
            ]
          }),

          PostCssPxToRem({
            rootValue: 75, // 基准值 设计稿的宽度/10  // 75=750
            // rootValue({ file }) {
            //   // 项目中使用的 antd官方社区的 antd-mobile 组件库。这里做了区分，如果样式文件命中有 antd-mobile 则以 375 样稿转化。这里不做区分，那么 antd-mobile 各组件样式会变形。
            //   return file.indexOf('antd-mobile') !== -1 ? 37.5 : 75
            // },
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
            selectorBlackList: ['norem'], // 忽略转换正则匹配的属性  // norem-开头的class，不进行rem转换
            // minPixelValue: 0, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
            exclude: /node_modules/i // node_modules目录下的文件，不进行rem转换
          }),

          Tailwindcss()
        ]
      }
    }

  }
})
