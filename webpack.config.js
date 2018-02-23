const path = require('path');


module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/src/components/App.jsx'),
  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/src/static/js'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.jsx?$/,
      exclude: "/node_modules/",
      include: path.join(__dirname, '/src/components'),
      loader: 'babel-loader',
      query: {
        presets: ["react", "env"]
      }
    },
    {
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
    }
    ],
  } 

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  //watch: true
};
