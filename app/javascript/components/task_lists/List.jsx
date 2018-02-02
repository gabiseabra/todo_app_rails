import autobind from "autobind-decorator"
import React, { Component, Fragment } from "react"
import { withRouter } from "react-router-dom"
import AddIcon from "grommet/components/icons/base/Add"
import RemoveIcon from "grommet/components/icons/base/Trash"
import ViewIcon from "grommet/components/icons/base/View"
import { List, ListItem, Button } from "grommet"
import { confirmDialog } from "../shared"
import Details from "./Details"

const stopPropagation = (e) => {
  e.stopPropagation()
}

class TaskLists extends Component {
  onNew = () => this.props.history.push("/my/lists/new")

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
        <Button title="Remove" icon={<RemoveIcon />} onClick={this.onRemove(i)} />
        <Button
          title="View"
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
      <ListItem
        focusable
        key={id}
        data-key={id}
        className="TaskLists-List--item">
        <span style={{ flex: "1 1 100%" }}>{title}</span>
        <span style={{ flex: "0 0 auto" }}><Details {...node} /></span>
        <span style={{ flex: "0 0 auto" }}>{this.renderControls(node, i)}</span>
      </ListItem>
    )
  }

  render() {
    const { children, editable } = this.props

    return (
      <div className="TaskLists-List">
        <List selectable onSelect={this.onSelect}>
          {children.map(this.renderNode)}
        </List>
        {editable &&
        <Button
          primary
          fill
          label="New List"
          icon={<AddIcon />}
          onClick={this.onNew} />}
      </div>
    )
  }
}

export default withRouter(TaskLists)
