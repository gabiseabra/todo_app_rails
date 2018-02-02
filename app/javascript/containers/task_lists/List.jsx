import React from "react"
import { inject, observer } from "mobx-react"
import { List } from "@/components/task_lists"
import { Loader, Pagination, withPagination } from "../shared"

function TaskListsListApp({ user: userId, page, taskLists, likes, ...props }) {
  const { pagination } = taskLists.getScopeData(userId)
  const lists = taskLists.getScope(userId, page)
  const editableProps = {}
  if(likes.validScope) {
    editableProps.onLike = likes.create
    editableProps.onDislike = likes.delete
  }
  if(props.editable) editableProps.onDelete = taskLists.delete
  return (
    <Loader
      overlay
      load={() => taskLists.fetchScope(userId, { page })}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof lists !== "undefined"}>
      <List {...props} {...editableProps}>{lists}</List>
      <Pagination {...pagination} current_page={page} />
    </Loader>
  )
}

export default withPagination(inject("taskLists", "likes")(observer(TaskListsListApp)))
