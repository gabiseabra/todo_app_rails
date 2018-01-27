const webpack = require("webpack")
const { environment } = require('@rails/webpacker')

environment.entry.set("common", [
  "babel-polyfill",
  "react",
  "react-dom",
  "mobx",
  "mobx-react"
])

environment.plugins.append(
  "common_chunks",
  new webpack.optimize.CommonsChunkPlugin({
    name: "common"
  })
)

module.exports = environment
