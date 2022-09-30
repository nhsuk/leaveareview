const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './app/assets/javascript/main.js'),
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'webpack.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './public/js-webpack/'),
    filename: 'webpack.js',
    clean: false,
  },
};
