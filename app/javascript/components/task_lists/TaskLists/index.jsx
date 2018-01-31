import autobind from "autobind-decorator"
import React, { Component, Fragment } from "react"
import { withRouter } from "react-router-dom"
import AddIcon from "grommet/components/icons/base/Add"
import RemoveIcon from "grommet/components/icons/base/Trash"
import { List, ListItem, Button } from "grommet"
import { confirmDialog } from "../../shared"

class TaskLists extends Component {
  onSelect = (i) => {
    const { history, children } = this.props
    console.log(1, children[i])
  }

  onRemove = i => (e) => {
    e.preventDefault()
    e.stopPropagation()
    const node = this.props.children[i]
    return confirmDialog({
      critical: true,
      buttonLabel: "Delete",
      title: `Delete #${node.id} ${node.title}`,
      children: `Really delete ${node.title}?`,
      onConfirm: () => console.log("!", this.props.children[i])
    })
  }

  @autobind
  renderControls(node, i) {
    const { editable, onDelete } = this.props
    if(!editable) return null
    return (
      <Fragment>
        <Button icon={<RemoveIcon />} onClick={this.onRemove(i)} />
      </Fragment>
    )
  }

  @autobind
  renderNode(node, i) {
    const { id, title } = node

    return (
      <ListItem justify="between" key={id}>
        <span>{title}</span>
        <span>{this.renderControls(node, i)}</span>
      </ListItem>
    )
  }

  render() {
    const { children } = this.props

    return (
      <List selectable onSelect={this.onSelect}>
        {children.map(this.renderNode)}
      </List>
    )
  }
}

export default withRouter(TaskLists)
