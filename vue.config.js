module.exports = {
  //отменяем минификацию html (для удобства деплоя темы на vue в wordpress)
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].minify = false
        return args
      })
  },


  //для REST API KSK66
  configureWebpack: (config) => {
    return {
      devServer: {
        proxy: {
          '/wp-json': {
            target: 'https://mystomat.neksk.ru',
            secure: false,
            changeOrigin: true
          }

        }
      }
    }
  },
  //////////////////

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
