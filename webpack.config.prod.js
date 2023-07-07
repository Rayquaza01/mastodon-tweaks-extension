/* eslint-disable */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtrackPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        background: __dirname + "/src/js/background.ts",
        popup: __dirname + "/src/js/popup.tsx",
        mastodon: __dirname + "/src/js/ContentScripts/mastodon.ts",
        content: __dirname + "/src/js/ContentScripts/content.ts",
        github: __dirname + "/src/js/ContentScripts/github.ts"
    },
    devtool: "source-map",
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtrackPlugin.loader, "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".jsx" ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtrackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/popup.html",
            filename: "popup.html",
            chunks: ["popup"],
        }),
        new copyWebpackPlugin({
            patterns: [
                { from: "src/manifest.json" },
                {
                    from: "src/icons/",
                    to: "icons",
                    toType: "dir"
                },
                {
                    from: "src/_locales/",
                    to: "_locales",
                    toType: "dir"
                },
                { from: "node_modules/webextension-polyfill/dist/browser-polyfill.min.js" },
                { from: "node_modules/webextension-polyfill/dist/browser-polyfill.min.js.map" },
                { from: "node_modules/react/umd/react.production.min.js", to: "react.js" }
            ]
        })
    ],
    externals: {
        "webextension-polyfill": "browser",
        "react": "React"
    },
    optimization: {
        usedExports: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
}
