import React, { Component } from "react"
import { Button, Form, FormField, TextInput, PasswordInput } from "grommet"
import Spinner from "grommet/components/icons/Spinning"

export default class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const { loading } = this.props
    const {
      email,
      username,
      password,
      passwordConfirmation
    } = this.state

    return (
      <Form onSubmit={this.onSubmit}>
        <FormField label="Username">
          <TextInput name="username" value={username} onDOMChange={this.onChange} />
        </FormField>
        <FormField label="Email">
          <TextInput name="email" value={email} onDOMChange={this.onChange} />
        </FormField>
        <FormField label="Password">
          <PasswordInput name="password" value={password} onChange={this.onChange} />
        </FormField>
        <FormField label="Repeat Password">
          <PasswordInput name="passwordConfirmation" value={passwordConfirmation} onChange={this.onChange} />
        </FormField>
        <div style={{ margin: "20px 0", textAlign: "right" }}>
          {loading && <Spinner />}
          <Button
            primary
            type={loading ? null : "submit"}
            label="Submit" />
        </div>
      </Form>
    )
  }
}
