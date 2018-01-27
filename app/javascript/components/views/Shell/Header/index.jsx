import React from "react"
import { Header, Title } from "grommet"
import { Nav as UserNav } from "@/components/users"

export default function AppHeader() {
  return (
    <Header fixed>
      <Title>Todo App</Title>
      <UserNav />
    </Header>
  )
}
