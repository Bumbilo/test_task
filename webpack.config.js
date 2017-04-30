const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/index.js',

  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
  },
    devtool: 'cheap-inline-module-source-map',
  devServer: {
    inline: true,
    port: 7777,
    contentBase: `${__dirname}/public`,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss',
      },

      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  postcss: () => {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
      }),
    ];
  },
};
