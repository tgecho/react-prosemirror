var path = require('path');

module.exports = {
    entry: {
        demo: path.join(__dirname, 'demo/demo.jsx')
    },
    output: {
        filename: '[name].build.js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
            {test: /\.json?$/, loader: 'json'},
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'react-prosemirror': __dirname
        }
    },
};
