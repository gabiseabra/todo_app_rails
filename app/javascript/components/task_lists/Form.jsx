import React from "react"
import { Form, CheckBox } from "grommet"
import { ResourceComponent } from "../shared"

export default class TaskListForm extends ResourceComponent {
  static defaultProps = {
    title: "",
    private: false
  }

  static attrs = [ "title", "private" ]

  render() {
    return (
      <Form className="TaskLists-Form" onSubmit={this.onSubmit}>
        <input
          className="form__plain"
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.onChange}
          onBlur={this.onSubmit} />
        <CheckBox
          toggle
          name="private"
          label="Private"
          checked={this.state.private}
          onChange={this.onCheck} />
      </Form>
    )
  }
}
