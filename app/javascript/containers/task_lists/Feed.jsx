import React from "react"
import { inject, observer } from "mobx-react"
import { Feed } from "@/components/task_lists"
import { Loader, Pagination, withPagination } from "../shared"

function TaskListsFeedApp({ taskLists, page, ...props }) {
  const { pagination } = taskLists.getFeedData()
  const lists = taskLists.getFeed(page)
  return (
    <Loader
      force={false}
      overlay
      load={() => taskLists.fetchFeed({ page })}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof lists !== "undefined"}>
      <Feed {...props}>{lists}</Feed>
      <Pagination {...pagination} current_page={page} />
    </Loader>
  )
}

export default withPagination(inject("taskLists")(observer(TaskListsFeedApp)))
