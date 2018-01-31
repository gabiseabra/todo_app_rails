import autobind from "autobind-decorator"
import React, { Component, Fragment } from "react"
import { withRouter } from "react-router-dom"
import AddIcon from "grommet/components/icons/base/Add"
import RemoveIcon from "grommet/components/icons/base/Trash"
import { List, ListItem, Button } from "grommet"
import { confirmDialog } from "../../shared"

class TaskLists extends Component {
  onSelect = (i) => {
    const { history, editable } = this.props
    const node = this.props.children[i]
    const url = (
      editable ?
        `/my/lists/${node.id}` :
        `/u/${node.user_ud}/lists/${node.id}`
    )
    history.push(url)
  }

  onRemove = i => (e) => {
    const { onDelete } = this.props
    const node = this.props.children[i]
    e.preventDefault()
    e.stopPropagation()
    return confirmDialog({
      critical: true,
      buttonLabel: "Delete",
      title: `Delete #${node.id} ${node.title}`,
      children: `Really delete ${node.title}?`,
      onConfirm: () => onDelete(node.id)
    })
  }

  @autobind
  renderControls(node, i) {
    const { editable } = this.props
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
