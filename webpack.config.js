const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: [
        './public/js/main.js'
    ],
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-decorators-legacy']
            }
        }]
    },
    devServer: {
        host: 'localhost',
        port: '8080',
        proxy: {
            '/': 'http://localhost:5000'
        }
    }
}
