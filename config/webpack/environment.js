const webpack = require("webpack")
const { environment } = require('@rails/webpacker')

console.log(environment.plugins)

environment.plugins.append(
  "common_chunks",
  new webpack.optimize.CommonsChunkPlugin({
    name: "common"
  })
)

module.exports = environment
