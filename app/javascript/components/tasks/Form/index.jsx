import React from "react"
import { List, ListItem } from "grommet"
import Task from "./Node"

export default function TaskForm({ children, ...props }) {
  return (
    <List>
      {children.map(task => (
        <Task key={task.id} {...props} {...task} />
      ))}
      <ListItem key="new">
        <Task new {...props} />
      </ListItem>
    </List>
  )
}
