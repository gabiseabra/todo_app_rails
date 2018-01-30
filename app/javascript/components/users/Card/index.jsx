import React from "react"
import { Title } from "grommet"
import Avatar from "../Avatar"

export default function Card({ username, avatar_url: avatar }) {
  return (
    <div className="Users-Card">
      <Title>{username}</Title>
      <Avatar src={avatar} size="large" />
    </div>
  )
}
