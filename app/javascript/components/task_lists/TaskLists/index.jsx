import autobind from "autobind-decorator"
import React, { Component, Fragment } from "react"
import { withRouter } from "react-router-dom"
import AddIcon from "grommet/components/icons/base/Add"
import RemoveIcon from "grommet/components/icons/base/Trash"
import ViewIcon from "grommet/components/icons/base/View"
import { List, ListItem, Button } from "grommet"
import { confirmDialog } from "../../shared"

const stopPropagation = (e) => {
  e.stopPropagation()
}

class TaskLists extends Component {
  onSelect = (i) => {
    const { editable, history } = this.props
    history.push(editable ? this.editUrl(i) : this.viewUrl(i))
  }

  onRemove = i => (e) => {
    const { onDelete } = this.props
    const node = this.props.children[i]
    stopPropagation(e)
    return confirmDialog({
      critical: true,
      buttonLabel: "Delete",
      title: `Delete #${node.id} ${node.title}`,
      children: `Really delete ${node.title}?`,
      onConfirm: () => onDelete(node.id)
    })
  }

  viewUrl = (i) => {
    const node = this.props.children[i]
    return `/lists/${node.id}`
  }

  editUrl = (i) => {
    const node = this.props.children[i]
    return `/my/lists/${node.id}`
  }

  @autobind
  renderControls(node, i) {
    const { editable } = this.props
    if(!editable) return null
    return (
      <Fragment>
        <Button icon={<RemoveIcon />} onClick={this.onRemove(i)} />
        <Button
          href={`/#${this.viewUrl(i)}`}
          target="_blank"
          rel="noopener noreferrer"
          icon={<ViewIcon />}
          onClick={stopPropagation} />
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
