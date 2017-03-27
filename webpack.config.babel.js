/**
 * Created by thram on 18/01/17.
 */
import { join } from 'path';

const include = join(__dirname, 'src');

export default function (env = {}) {
  return {
    entry: { 'react-thrux': './src/index' },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: join(__dirname, 'dist'),
      libraryTarget: 'umd',
      library: 'ReactThrux',
      filename: env.prod ? '[name].umd.min.js' : '[name].umd.js',
    },
    devtool: 'source-map',
    externals: {
      thrux: 'thrux',
      react: 'React',
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'babel-loader', include },
      ],
    },
  };
}
