import React, { Component } from "react"
import { Layer } from "grommet"
import Form from "../Form"
import List from "../List"

export default class TaskListDashboard extends Component {
  state = {
    active: false
  }

  onToggle = () => this.setState(state => ({ active: !state.active }))

  render() {
    const { children, ...props } = this.props
    const { active } = this.state

    return (
      <div>
        <List>{children}</List>
        {active &&
        <Layer
          closer
          overlayClose
          align="center"
          onClose={this.onToggle}>
          <Form {...props} />
        </Layer>}
      </div>
    )
  }
}
