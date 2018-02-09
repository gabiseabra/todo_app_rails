import autobind from "autobind-decorator"
import React, { Fragment } from "react"
import AddIcon from "grommet/components/icons/base/Add"
import RemoveIcon from "grommet/components/icons/base/Trash"
import { Form, List, ListItem, CheckBox, Button } from "grommet"
import { ResourceComponent } from "../../shared"

export default class Task extends ResourceComponent {
  static defaultProps = {
    task_id: null,
    checked: false,
    body: ""
  }

  static attrs = [ "checked", "body", "task_id" ]

  onCreate = (e) => {
    this.props.onCreate(this.state)
    this.setState(this.constructor.defaultProps)
    if(e) e.preventDefault()
  }

  onToggleSubtask = e => this.setState(state => ({ newSubtask: !state.newSubtask }))

  @autobind
  renderControls() {
    const { disabled } = this.props

    if(this.exists) {
      return [
        <Button
          key="new"
          title="Add Subtask"
          icon={<AddIcon />}
          onClick={disabled ? null : this.onToggleSubtask} />,
        <Button
          critical
          key="remove"
          title="Remove"
          icon={<RemoveIcon />}
          onClick={disabled ? null : this.onDelete} />
      ]
    } else {
      return (
        <Button
          title="Add"
          icon={<AddIcon />}
          onClick={disabled ? null : this.onSubmit} />
      )
    }
  }

  @autobind
  renderChildren() {
    const { id, tasks } = this.props
    const { newSubtask } = this.state

    if(!(newSubtask || tasks && tasks.length)) return null
    return (
      <ListItem key="children">
        <List>
          {tasks.map(node => <Task key={node.id} {...node} {...this.actions} />)}
          {newSubtask &&
          <Task new className="Tasks-Form__new" task_id={id} {...this.actions} />}
        </List>
      </ListItem>
    )
  }

  render() {
    const { disabled, className } = this.props
    const { body, checked } = this.state

    return (
      <Fragment>
        <ListItem key="task" justify="between">
          <span className={`Tasks-Form--body ${className}`}>
            <CheckBox
              name="checked"
              checked={checked}
              disabled={!this.exists || disabled}
              onChange={this.onCheck} />
            <Form plain className="form__inline" onSubmit={this.onSubmit}>
              <input
                className="form-field__plain"
                style={{ width: "100%" }}
                type="text"
                name="body"
                placeholder="..."
                disabled={disabled}
                value={body}
                onBlur={this.onSubmit}
                onChange={this.onChange} />
            </Form>
          </span>
          <span style={{ flex: "0 0 auto" }}>
            {this.renderControls()}
          </span>
        </ListItem>
        {this.renderChildren()}
      </Fragment>
    )
  }
}
