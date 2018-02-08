import React, { Fragment } from "react"
import { List, ListItem, CheckBox } from "grommet"

export default function TaskList({ tasks: children }) {
  return (
    <List className="TaskLists-Card">
      {children.map(({ body, id, checked, tasks }) => (
        <Fragment>
          <ListItem key={id}>
            <span>
              <CheckBox
                disabled
                checked={checked} />
            </span>
            <span>{body}</span>
          </ListItem>
          {tasks && tasks.length &&
          <ListItem>
            <TaskList tasks={tasks} />
          </ListItem>}
        </Fragment>
      ))}
    </List>
  )
}
