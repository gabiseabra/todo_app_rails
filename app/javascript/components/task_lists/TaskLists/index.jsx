import React from "react"
import { withRouter } from "react-router-dom"
import { List, ListItem } from "grommet"

function TaskLists({ children, history }) {
  return (
    <List
      selectable
      onSelect={i => history.push(`/my/lists/${children[i].id}`)}>
      {children.map(({ id, title }) => (
        <ListItem key={id}>
          {title}
        </ListItem>
      ))}
    </List>
  )
}

export default withRouter(TaskLists)
