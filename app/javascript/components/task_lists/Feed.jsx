import React from "react"
import { Link, withRouter } from "react-router-dom"
import { List, ListItem } from "grommet"
import { Avatar } from "../users"
import Details from "./Details"

const stopPropagation = e => e.stopPropagation()

function Node({ id, title, user, ...props }) {
  return (
    <ListItem data-key={id}>
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

function TaskListsFeed({ children, history }) {
  return (
    <List
      selectable
      onSelect={i => history.push(`/lists/${children[i].id}`)}>
      {children.map(taskList => <Node key={taskList.id} {...taskList} />)}
    </List>
  )
}

export default withRouter(TaskListsFeed)
