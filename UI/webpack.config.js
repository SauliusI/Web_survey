var path = require('path');

module.exports = {
    entry: './scripts/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'wwwroot')
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015','react',"stage-0"]
                }
            }
        ]
    },


    devtool: 'source-map',

    devServer: {
        inline: true,
        contentBase: 'wwwroot'
    }
};