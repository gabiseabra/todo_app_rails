import React from "react"
import { Shell } from "@/components/views"
import { Nav as UserNav } from "../users"

export default function App() {
  return (
    <Shell userNav={<UserNav />}>
      Hello World!
    </Shell>
  )
}
