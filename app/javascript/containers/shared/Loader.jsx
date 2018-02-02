import React, { Component } from "react"

export default class LoaderApp extends Component {
  componentDidMount() {
    const { load, loading, valid, force } = this.props
    if(force || !(valid || loading)) load()
  }

  componentWillReceiveProps({ load, loading, valid }) {
    if(!(valid || loading)) load()
  }

  render() {
    const { valid, children, component: Child } = this.props
    if(!valid) return null
    if(Child) return <Child {...this.props} />
    return this.props.children
  }
}
