const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// module.exports = {
//     webpack: {
//         alias: {},
//         plugins: [new BundleAnalyzerPlugin({
//             analyzerMode: "server",
//             analyzerPort: "auto",
//             defaultSizes: "gzip",
//         })],
//     },
// };

const CompressionPlugin = require("compression-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

module.exports = {
    webpack: {
        alias: {},
        plugins: [
            new CompressionPlugin({
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    ['js', 'css'].join('|') +
                    ')$'
                ),
                // threshold: 1024,
                // minRatio: 0.8
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: "disabled",
                analyzerPort: "auto",
                defaultSizes: "parsed",
            })
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         compress: {
            //             warnings: false,
            //             drop_debugger: true,
            //             drop_console: true,
            //         },
            //     },
            //     sourceMap: false,
            //     parallel: true,
            // }),

            // new SimpleProgressWebpackPlugin()

        ],
    },
};