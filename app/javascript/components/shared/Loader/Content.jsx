import React, { Component } from "react"

export default class LoadingContent extends Component {
  shouldComponentUpdate(next) {
    return next.loading === false
  }

  render() {
    return (
      <div className="Shared-Loader--content">
        {this.props.children}
      </div>
    )
  }
}
