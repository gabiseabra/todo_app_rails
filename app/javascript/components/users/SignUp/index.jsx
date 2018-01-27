import React, { Component } from "react"
import { Button, Form, FormField, TextInput, PasswordInput } from "grommet"

export default class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  onSubmit = () => this.props.onSubmit(this.state)

  render() {
    const { email, username, password, passwordConfirmation } = this.state

    return (
      <Form onSubmit={this.onSubmit}>
        <FormField label="Username">
          <TextInput name="username" value={username} onChange={this.onChange} />
        </FormField>
        <FormField label="Email">
          <TextInput name="email" value={email} onChange={this.onChange} />
        </FormField>
        <FormField label="Password">
          <PasswordInput name="password" value={password} onChange={this.onChange} />
        </FormField>
        <FormField label="Repeat Password">
          <PasswordInput name="passwordConfirmation" value={passwordConfirmation} onChange={this.onChange} />
        </FormField>
        <Button type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}
