import React from "react"
import { Link } from "react-router-dom"
import { List, ListItem } from "grommet"
import { Avatar } from "../users"
import Details from "./Details"

const stopPropagation = e => e.stopPropagation()

function Node({ title, user, ...props }) {
  return (
    <ListItem className="TaskLists-Feed">
      <span style={{ flex: "1 1 100%" }}>{title}</span>
      <span style={{ flex: "0 0 auto" }}><Details {...props} /></span>
      <span style={{ flex: "0 0 auto", marginLeft: "15px" }}>
        <Link to={`/u/${user.id}`} onClick={stopPropagation}>
          <Avatar size="small" src={user.avatar_url} title={user.username} />
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
