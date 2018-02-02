import React from "react"
import { inject, observer } from "mobx-react"
import { Feed } from "@/components/task_lists"
import { Loader, Pagination, withPagination } from "../shared"

function TaskListsLikesApp({ userId, likes, page, ...props }) {
  const lists = likes.getScope(userId)
  const pagination = likes.getPagination(userId)
  return (
    <Loader
      force
      overlay
      load={() => likes.fetchScope(userId, { page })}
      loading={likes.loading}
      error={likes.error}
      valid={typeof lists !== "undefined"}>
      <Feed {...props}>{lists}</Feed>
      <Pagination {...pagination} current_page={page} />
    </Loader>
  )
}

export default withPagination(inject("likes")(observer(TaskListsLikesApp)))
