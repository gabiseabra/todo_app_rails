import React, { Component } from "react"

export default class LoaderApp extends Component {
  componentDidMount() {
    const { load, loading, valid } = this.props
    if(!valid && !loading) load()
  }

  render() {
    const { valid, children, component: Child } = this.props
    if(!valid) return null
    if(Child) return <Child {...this.props} />
    return this.props.children
  }
}
