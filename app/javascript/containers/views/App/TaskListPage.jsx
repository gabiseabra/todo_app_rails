import React from "react"
import { inject, observer } from "mobx-react"
import { Page } from "@/components/views"
import { Card as TaskList } from "../../task_lists"

function TaskListPage({ taskLists, match }) {
  const { params: { id } } = match
  const pageProps = {}
  const taskList = taskLists.get(id)
  if(taskList) {
    pageProps.title = taskList.title
    pageProps.returnTo = `/u/${taskList.user_id}`
  }
  return (
    <Page {...pageProps}>
      <TaskList id={id} />
    </Page>
  )
}

export default inject("taskLists")(observer(TaskListPage))
