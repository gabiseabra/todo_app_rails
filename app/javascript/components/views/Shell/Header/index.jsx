import React from "react"
import { Header, Title } from "grommet"

export default function AppHeader({ userNav }) {
  return (
    <Header fixed className="App-Header">
      <Title>Todo App</Title>
      {userNav}
    </Header>
  )
}
