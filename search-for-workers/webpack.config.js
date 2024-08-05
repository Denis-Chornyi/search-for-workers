const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: !isProduction ? '/' : './'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(jpg|png|gif|svg|webp)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[ext]',
                outputPath: 'images'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: '[name].css'
        }),
      !isProduction && new webpack.HotModuleReplacementPlugin()
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.join(__dirname, 'build')
      },
      historyApiFallback: true,
      open: true,
      hot: true,
      port: 7887
    }
  };
};
