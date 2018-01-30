import React from "react"
import { Page } from "@/components/views"
import { Card } from "../../users"

export default function UserPage({ match }) {
  const { params: { id } } = match
  return (
    <Page>
      <Card id={id} />
    </Page>
  )
}
