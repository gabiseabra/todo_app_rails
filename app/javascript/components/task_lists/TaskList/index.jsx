import React from "react"
import { List, ListItem, CheckBox } from "grommet"

export default function TaskList({ tasks }) {
  return (
    <List>
      {tasks.map(({ body, id, checked }) => (
        <ListItem key={id}>
          <CheckBox
            disabled
            checked={checked} />
          {body}
        </ListItem>
      ))}
    </List>
  )
}
