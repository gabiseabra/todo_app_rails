import React from "react"
import { Form, CheckBox } from "grommet"
import { ResourceComponent } from "../shared"

export default class TaskListForm extends ResourceComponent {
  static defaultProps = {
    title: "",
    public: false
  }

  static attrs = [ "title", "public" ]

  render() {
    return (
      <Form className="TaskLists-Form" onSubmit={this.onSubmit}>
        <input
          className="form-field__plain"
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.onChange}
          onBlur={this.onSubmit} />
        <CheckBox
          toggle
          name="public"
          label="Public"
          checked={this.state.public}
          onChange={this.onCheck} />
      </Form>
    )
  }
}
