import React from "react"
import { Tabs, Tab } from "grommet"
import Login from "./Login"
import SignUp from "./SignUp"

export default function Auth({ onSignIn, onSignUp, ...props }) {
  return (
    <div className="Users-Form">
      <Tabs>
        <Tab title="Sign In">
          <Login onSubmit={onSignIn} {...props} />
        </Tab>
        <Tab title="Sign Up">
          <SignUp onSubmit={onSignUp} {...props} />
        </Tab>
      </Tabs>
    </div>
  )
}
