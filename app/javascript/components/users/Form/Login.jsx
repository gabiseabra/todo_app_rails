import React, { Component } from "react"
import { LoginForm } from "grommet"
// import Spinner from "grommet/components/icons/Spinning"

export default class Login extends Component {
  onSubmit = ({ username, password, rememberMe }) => {
    this.props.onSubmit({ email: username, password, rememberMe })
  }

  render() {
    const { loading, errors } = this.props

    return (
      <LoginForm
        rememberMe
        usernameType="email"
        errors={errors ? errors.todo_user : undefined}
        onSubmit={this.onSubmit} />
    )
  }
}
