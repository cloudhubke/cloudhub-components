const join = require().join;

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  include: [
    // Include everything from your app path
    path.resolve(__dirname, './src')
  ],
  exclude: /node_modules/,
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd-module',
    library: 'CloudhubComponents'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'css-loader' },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: ['raw-loader']
      }
    ]
  },
  externals: [/^@material-ui\/core\/.*/]
};
