import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { Shell } from "@/components/views"
import { Nav as UserNav } from "../../users"
import HomePage from "./HomePage"
import UserPage from "./UserPage"
import TaskListPage from "./TaskListPage"
import NewTaskListPage from "./NewTaskListPage"
import EditTaskListPage from "./EditTaskListPage"
import DashboardPage from "./DashboardPage"
import NotFound from "./NotFound"

export default function App(props) {
  return (
    <Shell userNav={<UserNav />} {...props}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/u/:id" component={UserPage} />
        <Route exact path="/lists/:id" component={TaskListPage} />
        <Redirect exact path="/my" to="/me" />
        <Route exact path="/me" component={DashboardPage} />
        <Route exact path="/:_(m[ey])/lists/new" component={NewTaskListPage} />
        <Route exact path="/:_(m[ey])/lists/:id" component={EditTaskListPage} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  )
}
