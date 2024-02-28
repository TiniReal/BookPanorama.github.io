const path = require('path');

module.exports = {
    mode: 'development', // Imposta il mode su 'development'
    entry: './assets/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};




