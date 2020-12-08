module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      echarts: 'echarts'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true
      }
    }
  }
}
