import React from "react"
import { Link } from "react-router-dom"
import { Header, Title } from "grommet"

export default function AppHeader({ userNav }) {
  return (
    <Header fixed className="App-Header">
      <Link to="/">
        <Title>Todo App</Title>
      </Link>
      {userNav}
    </Header>
  )
}
