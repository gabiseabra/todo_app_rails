import React from "react"
import { Link } from "react-router-dom"
import { List, ListItem } from "grommet"
import { Avatar } from "../users"

const stopPropagation = e => e.stopPropagation()

function Node({ title, user }) {
  return (
    <ListItem>
      <span>{title}</span>
      <span>
        <Link to={`/u/${user.id}`} onClick={stopPropagation}>
          <Avatar src={user.avatar_url} />
        </Link>
      </span>
    </ListItem>
  )
}

export default function TaskListsFeed({ children }) {
  return (
    <List>
      {children.map(taskList => <Node key={taskList.id} {...taskList} />)}
    </List>
  )
}
