import React from "react"
import { App } from "grommet"
import Header from "./Header"

export default function Shell({ children, className, ...props }) {
  return (
    <App className={`${className} App`}>
      <Header {...props} />
      <main className="App--main">
        {children}
      </main>
    </App>
  )
}
