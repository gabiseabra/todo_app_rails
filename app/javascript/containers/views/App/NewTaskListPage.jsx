import React from "react"
import { inject, observer } from "mobx-react"
import { Page } from "@/components/views"
import * as TaskLists from "../../task_lists"

function NewTaskListPage({ users, taskLists, match }) {
  const { params: { id } } = match
  return (
    <Page
      returnTo="/me"
      title="New List">
      <TaskLists.New userId={users.currentUserId} id={id} />
    </Page>
  )
}

export default inject("users")(observer(NewTaskListPage))
