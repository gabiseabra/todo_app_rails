import React from "react"
import { Button } from "grommet"
import UserIcon from "grommet/components/icons/base/User"

export default function UserNav() {
  return (
    <div>
      <Button icon={<UserIcon />} />
    </div>
  )
}
