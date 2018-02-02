import _ from "lodash"
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Loader } from "@/components/shared"

class LoaderApp extends Component {
  static defaultProps = {
    valid: true
  }

  componentDidMount() {
    const { load, loading, valid, force } = this.props
    if(force || !(valid || loading)) load()
  }

  componentWillReceiveProps({ load, loading, valid, location }) {
    if(!_.isEqual(location, this.props.location) && !(valid || loading)) load()
  }

  renderChildren() {
    const { valid, children, component: Child } = this.props
    if(!valid) return null
    if(Child) return <Child {...this.props} />
    return this.props.children
  }

  render() {
    return (
      <Loader {...this.props}>
        {this.renderChildren()}
      </Loader>
    )
  }
}

export default withRouter(LoaderApp)
