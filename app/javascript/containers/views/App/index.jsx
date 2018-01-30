import React from "react"
import { Switch, Route } from "react-router-dom"
import { Shell } from "@/components/views"
import { Nav as UserNav } from "../../users"
import HomePage from "./HomePage"
import UserPage from "./UserPage"
import DashboardPage from "./DashboardPage"
import NotFound from "./NotFound"

export default function App(props) {
  return (
    <Shell userNav={<UserNav />} {...props}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/u/:id" component={UserPage} />
        <Route exact path="/me" component={DashboardPage} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  )
}
