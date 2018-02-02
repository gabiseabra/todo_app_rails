import React from "react"
import { Link } from "react-router-dom"
import { Header, Title } from "grommet"

export default function AppHeader({ userNav }) {
  return (
    <div>
      <div id="app-header-indicator" />
      <Header fixed className="App-Header">
        <Link to="/">
          <Title>Todo App</Title>
        </Link>
        {userNav}
      </Header>
    </div>
  )
}
