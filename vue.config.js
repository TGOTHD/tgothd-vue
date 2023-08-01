const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/tgothd',
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      '/tgothd': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
