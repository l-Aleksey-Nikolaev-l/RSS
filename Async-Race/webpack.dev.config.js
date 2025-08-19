const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        host: 'localhost',
        port: 6700,
        hot: true,
        static: path.resolve(__dirname, './dist'),
        historyApiFallback: true,
    },
};
