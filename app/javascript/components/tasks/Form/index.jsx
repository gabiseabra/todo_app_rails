import React from "react"
import { List } from "grommet"
import Task from "./Node"

export default function TaskForm({ children, ...props }) {
  return (
    <List>
      {children && children.map(task => (
        <Task key={task.id} {...props} {...task} />
      ))}
      <Task new className="Tasks-Form__new" {...props} />
    </List>
  )
}
