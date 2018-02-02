import _ from "lodash"
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Loader } from "@/components/shared"

class LoaderApp extends Component {
  static defaultProps = {
    valid: true
  }

  componentDidMount() {
    const { loading, valid, force } = this.props
    if(force || !(valid || loading)) this.load()
  }

  componentWillReceiveProps({ loading, valid }) {
    if(!(valid || loading)) this.load()
  }

  load = _.throttle(() => this.props.load(), 600)

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
