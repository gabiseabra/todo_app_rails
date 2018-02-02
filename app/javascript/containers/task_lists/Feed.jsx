import React from "react"
import { inject, observer } from "mobx-react"
import { Feed } from "@/components/task_lists"
import { Loader } from "../shared"

function TaskListsFeedApp({ taskLists, search, ...props }) {
  const lists = taskLists.getFeed()
  return (
    <Loader
      force
      load={() => taskLists.fetchFeed(search)}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof lists !== "undefined"}>
      <Feed {...props}>{lists}</Feed>
    </Loader>
  )
}

export default inject("taskLists")(observer(TaskListsFeedApp))
