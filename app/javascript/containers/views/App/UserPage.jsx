import React from "react"
import { Page } from "@/components/views"
import { Card } from "../../users"
import { List as TaskLists } from "../../task_lists"

export default function UserPage({ match }) {
  const { params: { id } } = match
  return (
    <Page>
      <Card user={id} />
      <TaskLists user={id} />
    </Page>
  )
}
