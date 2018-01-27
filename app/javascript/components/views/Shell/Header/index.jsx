import React from "react"
import { Header, Title } from "grommet"

export default function AppHeader({ userNav }) {
  return (
    <Header fixed>
      <Title>Todo App</Title>
      {userNav}
    </Header>
  )
}
