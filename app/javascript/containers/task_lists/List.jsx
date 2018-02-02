import React from "react"
import { inject, observer } from "mobx-react"
import { List } from "@/components/task_lists"
import { Loader, Pagination } from "../shared"

function TaskListsListApp({ user: userId, page, taskLists, ...props }) {
  const { pagination } = taskLists.getScopeData(userId)
  const lists = taskLists.getScope(userId, page)
  const editableProps = {}
  if(props.editable) {
    editableProps.onDelete = taskLists.delete
  }
  return (
    <Loader
      overlay
      load={() => taskLists.fetchScope(userId, { page })}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof lists !== "undefined"}>
      <List {...props} {...editableProps}>{lists}</List>
      <Pagination {...pagination} />
    </Loader>
  )
}

export default inject("taskLists")(observer(TaskListsListApp))
