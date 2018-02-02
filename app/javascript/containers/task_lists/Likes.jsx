import React from "react"
import { inject, observer } from "mobx-react"
import { Feed } from "@/components/task_lists"
import { Loader, Pagination, withPagination } from "../shared"

function TaskListsLikesApp({ likes, page, ...props }) {
  const lists = likes.getScope(page)
  return (
    <Loader
      force
      overlay
      load={() => likes.fetchScope({ page })}
      loading={likes.loading}
      error={likes.error}
      valid={typeof lists !== "undefined"}>
      <Feed {...props} {...likes.props}>{lists}</Feed>
      <Pagination {...likes.pagination} current_page={page} />
    </Loader>
  )
}

export default withPagination(inject("likes")(observer(TaskListsLikesApp)))
