import React from "react"
import { inject, observer } from "mobx-react"
import { Card } from "@/components/users"
import { Loader } from "../shared"

function UserCardApp({ user: id, users }) {
  const user = users.get(id)
  return (
    <Loader
      load={() => users.fetch(id)}
      loading={users.loading}
      error={users.error}
      valid={typeof user !== "undefined"}>
      <Card {...user} />
    </Loader>
  )
}

export default inject("users")(observer(UserCardApp))
