import React from "react"
import { Paragraph } from "grommet"
import { Page } from "@/components/views"

export default function NotFound() {
  return (
    <Page title="404 - Not Found">
      <Paragraph>The page you're looking for does not exist</Paragraph>
    </Page>
  )
}
