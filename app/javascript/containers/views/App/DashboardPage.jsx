import React from "react"
import { Redirect } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { Page } from "@/components/views"
// import { LayerRoute } from "../../shared"
import { Card } from "../../users"
import * as TaskLists from "../../task_lists"

function UserPage({ users }) {
  if(!users.currentUser) return <Redirect to="/" />
  return (
    <Page>
      <Card user={users.currentUser.id} />
      <TaskLists.List editable user={users.currentUser.id} />
    </Page>
  )
}

export default inject("users")(observer(UserPage))
