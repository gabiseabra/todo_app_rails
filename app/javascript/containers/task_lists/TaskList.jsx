import React from "react"
import { inject, observer } from "mobx-react"
import { TaskList } from "@/components/task_lists"
import { Loader } from "../shared"

function TaskListApp({ id, taskLists, ...props }) {
  const data = taskLists.get(id)
  return (
    <Loader
      load={() => taskLists.fetch(id)}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof data !== "undefined"}>
      <TaskList {...data} {...props} />
    </Loader>
  )
}

export default inject("taskLists")(observer(TaskListApp))
