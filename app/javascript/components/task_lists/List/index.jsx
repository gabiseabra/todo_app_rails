import React from "react"
import { List, ListItem } from "grommet"

export default function TaskLists({ children }) {
  return (
    <List>
      {children.map(({ id, title }) => (
        <ListItem key={id}>
          {title}
        </ListItem>
      ))}
    </List>
  )
}
