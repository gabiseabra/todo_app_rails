import React from "react"
import { Switch, Route } from "react-router-dom"
import { Shell } from "@/components/views"
import { Nav as UserNav } from "../../users"
import HomePage from "./HomePage"
import NotFound from "./NotFound"

export default function App() {
  return (
    <Shell userNav={<UserNav />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  )
}
