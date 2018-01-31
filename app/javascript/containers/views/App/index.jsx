import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { Shell } from "@/components/views"
import { Nav as UserNav } from "../../users"
import HomePage from "./HomePage"
import UserPage from "./UserPage"
import TaskListPage from "./TaskListPage"
import DashboardPage from "./DashboardPage"
import NotFound from "./NotFound"

export default function App(props) {
  return (
    <Shell userNav={<UserNav />} {...props}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/u/:id" component={UserPage} />
        <Route exact path="/u/:user/lists/:id" component={TaskListPage} />
        <Redirect exact path="/my" to="/me" />
        <Route path="/:_(m[ey])" component={DashboardPage} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  )
}
