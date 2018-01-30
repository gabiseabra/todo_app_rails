import React from "react"
import { inject, observer } from "mobx-react"
import { Card } from "@/components/users"

function UserCardApp({ id, users }) {
  const user = (
    typeof id === "undefined" ?
      users.currentUser :
      users.get(id)
  )
  return (
    <Card {...user} />
  )
}

export default inject("users")(observer(UserCardApp))
