import autobind from "autobind-decorator"
import React from "react"
import AddIcon from "grommet/components/icons/base/Add"
import RemoveIcon from "grommet/components/icons/base/Trash"
import { Form, ListItem, CheckBox, Button } from "grommet"
import { ResourceComponent } from "../../shared"

export default class Task extends ResourceComponent {
  static defaultProps = {
    checked: false,
    body: ""
  }

  static attrs = [ "checked", "body" ]

  onCreate = (e) => {
    this.props.onCreate(this.state)
    this.setState(this.constructor.defaultProps)
    if(e) e.preventDefault()
  }

  @autobind
  renderControls() {
    const { disabled } = this.props

    if(this.exists) {
      return (
        <Button
          critical
          icon={<RemoveIcon />}
          onClick={disabled ? null : this.onDelete} />
      )
    } else {
      return (
        <Button
          icon={<AddIcon />}
          onClick={disabled ? null : this.onSubmit} />
      )
    }
  }

  render() {
    const { disabled } = this.props
    const { body, checked } = this.state

    return (
      <ListItem justify="between">
        <span>
          <CheckBox
            name="checked"
            checked={checked}
            disabled={!this.exists || disabled}
            onChange={this.onCheck} />
          <Form plain style={{ display: "inline" }} onSubmit={this.onSubmit}>
            <input
              type="text"
              name="body"
              disabled={disabled}
              value={body}
              onBlur={this.onSubmit}
              onChange={this.onChange} />
          </Form>
        </span>
        <span>
          {this.renderControls()}
        </span>
      </ListItem>
    )
  }
}
