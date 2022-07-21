const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://platokpp.tmweb.ru/'
  },
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
})
