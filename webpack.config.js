//vue-loaderのv15を使用する際に必要なおまじない
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: `./src/index.js`,
    
    output: {
        path: `${__dirname}/dist`,
        filename: 'main.js'
    },

    mode: "development",

    devServer: {
        contentBase: "dist",
        open: true
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    //vue-loaderのv15を使用する際に必要なおまじない
    plugins: [
        new VueLoaderPlugin()
    ],

    resolve: {
        alias: {
            // 完全ビルド版のvueを使用する設定
            vue: 'vue/dist/vue.common.js'
        }
    },
}