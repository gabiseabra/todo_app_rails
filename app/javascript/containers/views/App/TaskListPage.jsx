import React from "react"
import { Page } from "@/components/views"
import { Card as TaskList } from "../../task_lists"

export default function TaskListPage({ match }) {
  const { params: { id } } = match
  return (
    <Page>
      <TaskList id={id} />
    </Page>
  )
}
