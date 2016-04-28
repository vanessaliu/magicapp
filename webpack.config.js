module.exports = {
  entry: './src/App.js',
  output: {
    path: './src',
    filename: 'bundle.js',
  },
  devServer: {
    inline:true,
    contentBase: './src',
    port: process.env.PORT || 3333
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }
    ]
  }
}