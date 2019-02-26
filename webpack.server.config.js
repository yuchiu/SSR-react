const path = require("path")
const webpackNodeExternals = require("webpack-node-externals")

module.exports = {
    target: "node",
    mode: "development",
    entry: "./src/server/index.js",
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/build"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
                options:{
                    presets:[
                        "react",
                        "es2015",
                        "es2017",
                        "stage-0",
                        ["env", {
                            target: { browsers: ["last 2 versions"]}
                        }]
                    ]
                }
            }
        ]
    },
    externals: [webpackNodeExternals()]
}