const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
      },
    },
  ],
}
