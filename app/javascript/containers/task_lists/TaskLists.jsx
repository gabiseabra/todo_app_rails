import React from "react"
import { inject, observer } from "mobx-react"
import { TaskLists } from "@/components/task_lists"
import { Loader } from "../shared"

function TaskListsApp({ user, taskLists, ...props }) {
  const lists = taskLists.getScope(`/users/${user}`)
  return (
    <Loader
      load={() => taskLists.fetchScope(user)}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof lists !== "undefined"}>
      <TaskLists {...props}>{lists}</TaskLists>
    </Loader>
  )
}

export default inject("taskLists")(observer(TaskListsApp))
