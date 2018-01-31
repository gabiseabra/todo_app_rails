import React from "react"
import { inject, observer } from "mobx-react"
import { List } from "@/components/task_lists"
import { Loader } from "../shared"

function TaskListsListApp({ user: userId, users, taskLists, ...props }) {
  const user = users.get(userId)
  const lists = taskLists.getScope(userId)
  const editableProps = {}
  if(props.editable) {
    editableProps.onDelete = taskLists.delete
  }
  return (
    <Loader
      load={() => taskLists.fetchScope(userId)}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof lists !== "undefined"}>
      <List user={user} {...props} {...editableProps}>{lists}</List>
    </Loader>
  )
}

export default inject("taskLists", "users")(observer(TaskListsListApp))
