import React from "react"
import { Switch, Redirect } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { Page } from "@/components/views"
import { LayerRoute } from "../../shared"
import { Card } from "../../users"
import * as TaskLists from "../../task_lists"

function UserPage({ users }) {
  if(!users.currentUser) return <Redirect to="/" />
  return (
    <Page>
      <Card user={users.currentUser.id} />
      <TaskLists.List editable user={users.currentUser.id} />
      <Switch>
        <LayerRoute exact path="/lists/edit" component={TaskLists.Edit} />
        <LayerRoute exact path="/lists/:id" component={TaskLists.New} />
      </Switch>
    </Page>
  )
}

export default inject("users")(observer(UserPage))
