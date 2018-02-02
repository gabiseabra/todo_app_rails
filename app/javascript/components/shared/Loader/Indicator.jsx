import React, { Component } from "react"
import ReactDOM from "react-dom"
import Spinner from "grommet/components/icons/Spinning"

export default class LoadingIndicator extends Component {
  get target() { return document.getElementById("app-header-indicator") }

  renderMirror() {
    return ReactDOM.createPortal(
      <div className="Shared-Loader--mirror" />,
      this.target
    )
  }

  render() {
    const { loading, overlay } = this.props
    return (
      <div
        className="Shared-Loader--indicator"
        data-overlay={Boolean(overlay).toString()}>
        <Spinner size={overlay ? "large" : "small"} />
        {!overlay && this.renderMirror()}
      </div>
    )
  }
}
