const webpack = require('webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        entry: './index.js',
        output: {
            path: __dirname + '/dist',
            publicPath: '/dist',
            filename: 'png-projection.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [ 'babel-loader' ]
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js']
        },
        plugins: isProduction
        ? undefined
        : [ new webpack.HotModuleReplacementPlugin() ],
        devServer: isProduction
            ? undefined
            : {
                port: 8087,
                contentBase: './',
                hot: true
            },
        devtool: isProduction ? undefined : 'eval'
    };
};
