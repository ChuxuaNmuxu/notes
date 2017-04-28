const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}

const plugin = new ExtractTextPlugin({
    filename: '[name].css',
});

const commonConfig = {
        entry: {
            app: PATHS.app
        },
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'webpack demo'
            }),
            plugin
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: plugin.extract({
                        use: 'css-loader',
                        fallback: 'style-loader',
                    }),
                },
                {
                    test: /\.js|jsx$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                            // Enable caching for improved performance during
                            // development.
                            // It uses default OS directory by default. If you need
                            // something more custom, pass a path to it.
                            // I.e., { cacheDirectory: '<path>' }
                            cacheDirectory: true,
                            presets: ['react', 'es2015'],
                    },
                },
            ]
        }
}

const productionConfig = () => commonConfig;

const developConfig = () => {
    const config = {
        devServer: {
            historyApiFallback: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        }
    }

    return Object.assign(
        {},
        commonConfig,
        config
    )
}



module.exports = (env) => {
    if (env === 'production') {
        return productionConfig();
    }
    return developConfig();
}