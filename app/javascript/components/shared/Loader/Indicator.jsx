import React, { Component } from "react"
import ReactDOM from "react-dom"
import Spinner from "grommet/components/icons/Spinning"

export default class LoadingIndicator extends Component {
  get target() { return document.getElementById("app-header-indicator") }

  renderChildren() {
    const { loading, overlay } = this.props
    return (
      <div className="Shared-Loader--indicator" data-overlay={Boolean(overlay).toString()}>
        <Spinner size={overlay ? "large" : "small"} />
      </div>
    )
  }

  render() {
    const { overlay } = this.props
    const children = this.renderChildren()
    if(overlay) return children
    else return ReactDOM.createPortal(children, this.target)
  }
}
