import React from "react"
import { List, ListItem, CheckBox } from "grommet"

export default function TaskList({ tasks }) {
  return (
    <List>
      {tasks.map(({ body, id, checked }) => (
        <ListItem key={id}>
          <span>
            <CheckBox
              disabled
              checked={checked} />
          </span>
          <span>{body}</span>
        </ListItem>
      ))}
    </List>
  )
}
