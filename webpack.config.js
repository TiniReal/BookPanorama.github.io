const path = require('path');

module.exports = {
    mode: 'development',
    entry: './assets/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map', 
};


