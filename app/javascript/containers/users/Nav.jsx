import React from "react"
import { inject, observer } from "mobx-react"
import { Nav } from "@/components/users"

function NavApp({ users }) {
  return (
    <Nav
      user={users.currentUser}
      loading={users.loading}
      errors={users.error && users.error.errors}
      onDismissError={users.dismissError}
      onSignOut={users.signOut}
      onSignIn={users.signIn}
      onSignUp={users.signUp} />
  )
}

export default inject("users")(observer(NavApp))
