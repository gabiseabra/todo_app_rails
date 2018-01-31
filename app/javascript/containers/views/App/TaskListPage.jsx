import React from "react"
import { Page } from "@/components/views"
import { TaskList } from "../../task_lists"

export default function TaskListPage({ match }) {
  const { params: { user, id } } = match
  return (
    <Page>
      <TaskList user={user} id={id} />
    </Page>
  )
}
