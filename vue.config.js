var webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
       'process.env.BOOKSHELF_DOMAIN': JSON.stringify(process.env.BOOKSHELF_DOMAIN),
       'process.env.AUTHORS_DOMAIN': JSON.stringify(process.env.AUTHORS_DOMAIN),
       'process.env.PUBLISHERS_DOMAIN': JSON.stringify(process.env.PUBLISHERS_DOMAIN),
      })
    ]
  }
}
