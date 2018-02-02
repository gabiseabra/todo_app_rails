import React from "react"
import { inject, observer } from "mobx-react"
import { List } from "@/components/task_lists"
import { Loader } from "../shared"

function TaskListsListApp({ user: userId, taskLists, ...props }) {
  const lists = taskLists.getScope(userId)
  const editableProps = {}
  if(props.editable) {
    editableProps.onDelete = taskLists.delete
  }
  return (
    <Loader
      overlay
      load={() => taskLists.fetchScope(userId)}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof lists !== "undefined"}>
      <List {...props} {...editableProps}>{lists}</List>
    </Loader>
  )
}

export default inject("taskLists")(observer(TaskListsListApp))
