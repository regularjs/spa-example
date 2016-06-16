var path = require('path');
var webpack = require('webpack');
var argv = require('yargs').argv;
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config =  {
    output: {
        path: __dirname + '/public' ,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw" },
            { test: /\.js$/, loader: 'babel?cacheDirectory'}
        ]

    },
    // externals: ['path', /server/ ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        // copy file from app/client/assets
        new CopyWebpackPlugin([

            { from: 'app/client/assets' }

        ])
    ],
    devtool:'source-map',
    watch: true
};

if(argv.production){
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ); 
    delete config.devtool;
    delete config.watch;
}


module.exports = config;