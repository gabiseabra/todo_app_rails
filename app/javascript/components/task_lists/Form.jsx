import React from "react"
import { Form } from "grommet"
import { ResourceComponent } from "../shared"

export default class TaskListForm extends ResourceComponent {
  static defaultProps = {
    title: ""
  }

  static attrs = [ "title" ]

  render() {
    const { title } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.onChange}
          onBlur={this.onSubmit} />
      </Form>
    )
  }
}
