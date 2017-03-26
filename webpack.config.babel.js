/**
 * Created by thram on 18/01/17.
 */
import { join } from 'path';

const include = join(__dirname, 'src');

export default {
  entry: './src/index.jsx',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'ReactThrux',
  },
  devtool: 'source-map',
  externals: {
    thrux: 'thrux',
    react: 'React'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', include },
    ],
  },
};
