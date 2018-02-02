import React from "react"
import { inject, observer } from "mobx-react"
import { Page } from "@/components/views"
import { Likes } from "../../task_lists"

function LikesPage({ users }) {
  const user = users.currentUser
  return (
    <Page returnTo={`/u/${user.id}`} title={`${user.username}'s Likes`}>
      <Likes userId={users.currentUserId} />
    </Page>
  )
}

export default inject("users")(observer(LikesPage))
