import React from "react"
import { Heading } from "grommet"
import Avatar from "../Avatar"

export default function Card({ username, avatar_url: avatar }) {
  return (
    <div className="Users-Card">
      <Heading>{username}</Heading>
      <Avatar src={avatar} size="medium" />
    </div>
  )
}
