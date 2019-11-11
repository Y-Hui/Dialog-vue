const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  // 预防打包错误
  publicPath: './',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 750,
            minPixelValue: 1,
            unitPrecision: 5,
            exclude: /node_modules/
          })
        ]
      }
    }
  }
}
