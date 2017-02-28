/**
 * Created by thram on 18/01/17.
 */
import {join} from 'path';

const include = join(__dirname, 'src');

export default {
  entry    : './src/index',
  output   : {
    path         : join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library      : 'ReactThrux',
  },
  devtool  : 'source-map',
  externals: {
    thrux      : 'thrux',
    react      : 'React',
    "react-dom": 'ReactDOM',
  },
  module   : {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', include}
    ]
  }
};