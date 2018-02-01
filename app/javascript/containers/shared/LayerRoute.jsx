import _ from "lodash"
import autobind from "autobind-decorator"
import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"
import { Layer } from "@/components/shared"

class LayerRoute extends Component {
  onClose = () => {
    const { history, match } = this.props
    if(history.length) history.go(-1)
    else history.push(match.url)
  }

  get routeProps() {
    return _.omit(this.props, [ "path", "match", "children" ])
  }

  @autobind
  renderRoute() {
    const { children } = this.props

    console.log("...")

    return (
      <Layer
        closer
        overlayClose
        align="center"
        onClose={this.onClose}>
        {children}
      </Layer>
    )
  }

  render() {
    const { path, match } = this.props

    return (
      <Route {...this.routeProps} path={`${match.path}${path}`} render={this.renderRoute} />
    )
  }
}

export default withRouter(LayerRoute)
