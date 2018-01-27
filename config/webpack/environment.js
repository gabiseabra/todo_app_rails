const webpack = require("webpack")
const { environment } = require('@rails/webpacker')

environment.plugins.append(
  "common_chunks",
  new webpack.optimize.CommonsChunkPlugin({
    name: "common"
  })
)

module.exports = environment
