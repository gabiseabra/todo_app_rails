import React from "react"
import { Form, CheckBox } from "grommet"
import { ResourceComponent } from "../shared"

export default class TaskListForm extends ResourceComponent {
  static defaultProps = {
    title: "",
    public: true
  }

  static attrs = [ "title", "public" ]

  render() {
    return (
      <Form className="TaskLists-Form" onSubmit={this.onSubmit}>
        <div className="TaskLists-Form--title">
          <input
            className="form-field__plain"
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onChange}
            onBlur={this.onSubmit} />
        </div>
        <div className="TaskLists-Form--public">
          <CheckBox
            toggle
            name="public"
            label="Public"
            checked={this.state.public}
            onChange={this.onCheck} />
        </div>
      </Form>
    )
  }
}
