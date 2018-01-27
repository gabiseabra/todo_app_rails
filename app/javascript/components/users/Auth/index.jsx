import React from "react"
import { Tabs, Tab, LoginForm } from "grommet"
import SignUp from "../SignUp"

export default function Auth({ onSignIn, onSignUp }) {
  return (
    <Tabs>
      <Tab title="Sign In">
        <LoginForm onSubmit={onSignIn} />
      </Tab>
      <Tab title="Sign Up">
        <SignUp onSubmit={onSignUp} />
      </Tab>
    </Tabs>
  )
}
