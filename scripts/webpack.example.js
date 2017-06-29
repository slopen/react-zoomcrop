const path = require ('path');
const env = require ('process-env');
const webpack = require ('webpack');

const SRC_PATH = path.resolve (__dirname, '../example');

module.exports = {
    cache: true,
    devtool: 'source-map',
    devServer: {
        port: 8080,
        contentBase: SRC_PATH
    },
    entry: path.resolve (SRC_PATH, 'index.js'),
    output: {
        path: SRC_PATH,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            SRC_PATH,
            path.resolve (__dirname, '../src'),
            path.resolve (__dirname, '../node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.?css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin (),
        new webpack.DefinePlugin ({
            '__DEV__': true,
            'process.env': {
                'NODE_ENV': JSON.stringify (
                    env.get ('NODE_ENV')
                        ? env.get ('NODE_ENV')
                        : 'development'
                )
            }
        })
    ]
}
