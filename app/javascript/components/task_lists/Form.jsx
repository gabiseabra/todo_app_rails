import React from "react"
import { Form } from "grommet"
import { ResourceComponent } from "../shared"

export default class TaskListForm extends ResourceComponent {
  state = {
    title: ""
  }

  render() {
    const { title } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.onChange}
          onBlur={this.onSubmit} />
      </Form>
    )
  }
}
