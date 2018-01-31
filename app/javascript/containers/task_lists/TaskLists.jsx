import React from "react"
import { inject, observer } from "mobx-react"
import { TaskLists } from "@/components/task_lists"
import { Loader } from "../shared"

function TaskListsApp({ user: userId, users, taskLists, ...props }) {
  const user = users.get(userId)
  const lists = taskLists.getScope(userId)
  return (
    <Loader
      load={() => taskLists.fetchScope(userId)}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof lists !== "undefined"}>
      <TaskLists user={user} {...props}>{lists}</TaskLists>
    </Loader>
  )
}

export default inject("taskLists", "users")(observer(TaskListsApp))
