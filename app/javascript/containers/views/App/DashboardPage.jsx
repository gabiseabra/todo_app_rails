import React from "react"
import { Redirect } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { Page } from "@/components/views"
import { Card } from "../../users"
import { TaskLists } from "../../task_lists"

function UserPage({ users }) {
  if(!users.currentUser) return <Redirect to="/" />
  return (
    <Page>
      <Card user={users.currentUser.id} />
      <TaskLists user={users.currentUser.id} />
    </Page>
  )
}

export default inject("users")(observer(UserPage))
