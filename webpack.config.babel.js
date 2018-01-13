import { join } from 'path';
const include = join(__dirname, 'src');
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default {
  devtool: 'source-map',
  entry: [require.resolve('regenerator-runtime/runtime.js'), './src/index'],
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'react-ckeditor5',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'css-loader' },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['raw-loader'],
      },
    ],
  },
  externals: {
    react: 'commonjs react', // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  },
};
