const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    host: '0.0.0.0',
    open: true,
    stats: 'errors-warnings',
  },
  resolve: {
    extensions: ['.scss', '.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              '...',
              {
                tag: 'link',
                attribute: 'href',
                type: 'src',
              },
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'public', 'index.html'),
    }),
  ],
}
