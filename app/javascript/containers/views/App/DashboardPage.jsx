import React from "react"
import { Redirect } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { Page } from "@/components/views"
import { Card } from "../../users"

function UserPage({ users }) {
  if(!users.currentUser) return <Redirect to="/" />
  return (
    <Page>
      <Card />
    </Page>
  )
}

export default inject("users")(observer(UserPage))
