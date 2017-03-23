const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglify-js-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

let config = {
  devtool: isProd ? 'source-map' : 'eval-source-map',

  entry: {
    // 'polyfills': './src/polyfills.browser.ts',
    // 'vendor': './src/vendor.ts',
    'main': './src/main.browser.ts'
  },
  output: {
    publicPath: isProd ? './' : '',
    sourceMapFilename: '[name].map',
    path: path.resolve(__dirname, './dist'),
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  },

  plugins: [
    new CommonsChunkPlugin({
      name: ['vendor', 'polyfills.browser']
    }),

    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),

    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)src(\\|\/)linker/, path.resolve(__dirname, './src'), { }),
    
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      hash: true,
      isProd:isProd
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
        },
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    }),

    new ExtractTextPlugin({ filename: 'css/[name].[hash].css', disable: !isProd }),
    
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './src/common/') }
    ])
  ],

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=images/bundle-[name].[hash].[ext]?'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=1&name=images/bundle-[name][hash:8].[ext]'
      },
      {
          test: /\.svg$/,
          exclude: /(node_modules)/,
          loader: 'url-loader?limit=1&name=images/bundle-[name][hash:8].[ext]'
      },
      { test: /\.json$/, include: path.resolve(__dirname, 'src'), loader: 'json-loader' },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
      { test: /\.(scss|sass)$/, loader: 'raw-loader!postcss-loader!sass-loader' },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
    modules: [path.resolve(__dirname, 'node_modules')]
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
};

if (isProd) {
  config.plugins.push(
    // new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin({ sourceMap: true, mangle: { keep_fnames: true } })
  );
}

module.exports = config;
