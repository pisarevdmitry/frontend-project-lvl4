// @ts-check
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    main: path.join(__dirname, 'src', 'index.jsx'),
    rollbar: path.join(__dirname, 'src', 'rollbar.js'),
  },
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devServer: {
    compress: true,
    port: 8080,
    host: 'localhost',
    publicPath: '/assets/',
    contentBase: path.join(__dirname, '/src'),
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.jpg?$/,
        type: 'asset',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
