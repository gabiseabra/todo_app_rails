import React from "react"
import { inject, observer } from "mobx-react"
import { Card } from "@/components/task_lists"
import { Loader } from "../shared"

function TaskListsCardApp({ id, taskLists, ...props }) {
  const data = taskLists.get(id)
  return (
    <Loader
      load={() => taskLists.fetch(id)}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof data !== "undefined"}>
      <Card {...data} {...props} />
    </Loader>
  )
}

export default inject("taskLists")(observer(TaskListsCardApp))
