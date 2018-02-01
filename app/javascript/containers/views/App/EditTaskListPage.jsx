import React from "react"
import { Page } from "@/components/views"
import * as TaskLists from "../../task_lists"

export default function EditTaskListPage({ match }) {
  const { params: { id } } = match
  return (
    <Page>
      <TaskLists.Edit id={id} />
    </Page>
  )
}
