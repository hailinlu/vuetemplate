const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ],
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js"
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("utils", resolve("src/utils"));
  },
  devServer: {
    host: "0.0.0.0", //要设置当前访问的ip 否则失效
    open: true, //浏览器自动打开页面
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  // CSS 相关选项
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/assets/css/varuables.scss` 这个文件
        // prependData: `@import "@/assets/css/base.scss";`
      }
    }
  }
};
