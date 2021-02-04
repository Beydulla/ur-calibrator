var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {

    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
              }
        ] 
        
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
        new webpack.DefinePlugin(envKeys)],
    devServer: {
        historyApiFallback: true,
        port: 3200,
        host: '0.0.0.0'
    },
    externals: {
        'config': JSON.stringify(process.env.REACT_APP_ENV === 'production' ? {
            apiUrl: process.env.REACT_APP_API_URL
          } : {
            apiUrl: "http://localhost:3800"
          })
    }
}