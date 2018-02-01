import autobind from "autobind-decorator"
import React from "react"
import AddIcon from "grommet/components/icons/base/Add"
import RemoveIcon from "grommet/components/icons/base/Trash"
import { ListItem, CheckBox, Button } from "grommet"
import { ResourceComponent } from "../../shared"

export default class Task extends ResourceComponent {
  static defaultProps = {
    checked: true,
    body: ""
  }

  static attrs = [ "checked", "body" ]

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
          {this.exists &&
          <CheckBox
            name="checked"
            checked={checked}
            disabled={disabled}
            onChange={this.onCheck} />}
          <input
            type="text"
            name="body"
            disabled={disabled}
            value={body}
            onChange={this.onChange} />
        </span>
        <span>
          {this.renderControls()}
        </span>
      </ListItem>
    )
  }
}
