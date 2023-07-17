import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv, ConfigEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from "path";

let pathUrl = (url: string) => {
  return resolve(__dirname, url);
};

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env.VITE_ENV);
   return defineConfig({
    base: "./", // 设置公共基础路径
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue"]
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
     //启动端口
    server: {
      port: 4000, // 设置服务启动端口号，如果端口已经被使用，Vite 会自动尝试下一个可用的端口
      open: false, // boolean | string 设置服务启动时是否自动打开浏览器，当此值为字符串时，会被用作 URL 的路径名
      cors: true, // 为开发服务器配置 CORS，配置为允许跨域
      // host: "192.168.0.105",
      //代理
      proxy: {
        "/api": {
          target: "https://114.55.56.117", // 后台服务地址
          changeOrigin: true, // 是否允许不同源
          secure: false, // 支持https
          rewrite: (path) => path.replace(/api/, ""),
        },
      },
    },
    //设置路径
    resolve: {
      alias: {
        "@": pathUrl("./src"),
        components: pathUrl("./src/components"),
        assets: pathUrl("./src/assets"),
        "#": pathUrl("types"),
      },
      dedupe: ["vue"],
    },
    css: {
      //全局scss
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/sass/base.scss";',
        },
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      outDir: env.VITE_ENV === "develop" ? "dist" : "h5", // 指定打包路径，默认为项目根目录下的 dist 目录
      minify: "terser", // 打包压缩配置，默认是esbuild，压缩需要配置为terser，如果没有配置terset，而直接调用了terserOptions则会输出警告信息
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
      },
      // 指定小于多少大小的内容将内联为base64，减少请求次数（默认4096，即4kb）
      assetsInlineLimit: 5000,
      // 生成map文件，默认false
      // sourcemap: true,
      // 输出设置
      rollupOptions: {
        // 指定打包的入口文件
        input: {
          default: "./index.html",
        },
        output: {
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: "default/[name]-[hash].js",
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: "js/[name]-[hash].js",
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
      chunkSizeWarningLimit: 500, // chunk 大小警告的限制（以 kbs 为单位）
    },
  })
 }
