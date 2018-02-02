import React, { Component } from "react"
import { Loader } from "@/components/shared"

export default class LoaderApp extends Component {
  static defaultProps = {
    valid: true
  }

  componentDidMount() {
    const { load, loading, valid, force } = this.props
    if(force || !(valid || loading)) load()
  }

  componentWillReceiveProps({ load, loading, valid }) {
    if(!(valid || loading)) load()
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
