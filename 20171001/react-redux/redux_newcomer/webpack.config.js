module.exports = {
    entry: './react-redux.js',

    output: {
        filename: 'bundle.js',
        publicPath: ''
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
        ]
    }
}
