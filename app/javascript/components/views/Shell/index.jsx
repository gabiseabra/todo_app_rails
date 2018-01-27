import React from "react"
import { App } from "grommet"
import Header from "./Header"

export default function Shell({ children, ...props }) {
  return (
    <App>
      <Header {...props} />
      {children}
    </App>
  )
}
