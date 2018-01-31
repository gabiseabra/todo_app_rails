import React from "react"
import { withRouter } from "react-router-dom"
import { List, ListItem } from "grommet"

function TaskLists({ children, history, user }) {
  return (
    <List
      selectable
      onSelect={i => history.push(`/u/${user.id}/lists/${children[i].id}`)}>
      {children.map(({ id, title }) => (
        <ListItem key={id}>
          {title}
        </ListItem>
      ))}
    </List>
  )
}

export default withRouter(TaskLists)
