import _ from "lodash"
import React, { Component } from "react"
import { Tip, Button, Form, FormField, TextInput, PasswordInput } from "grommet"
import Spinner from "grommet/components/icons/Spinning"

export default class SignUp extends Component {
  static defaultProps = {
    fields: {
      email: "todo_field_email",
      username: "todo_field_username",
      password: "todo_field_password",
      password_confirmation: "todo_field_password_confirmation"
    }
  }

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

  renderErrors() {
    const { errors, fields } = this.props
    if(_.isEmpty(errors)) return null
    return Object.entries(fields).map(([ name, id ]) => {
      console.log(name, errors[name])
      if(errors[name]) {
        return (
          <Tip key={name} target={id} align="left" onClose={() => null}>
            {errors[name]}
          </Tip>
        )
      }
      return null
    })
  }

  render() {
    const { loading, fields } = this.props
    const {
      email,
      username,
      password,
      passwordConfirmation
    } = this.state

    return (
      <Form onSubmit={this.onSubmit}>
        <FormField label="Username">
          <TextInput
            id={fields.username}
            name="username"
            value={username}
            onDOMChange={this.onChange} />
        </FormField>
        <FormField label="Email">
          <TextInput
            id={fields.email}
            name="email"
            value={email}
            onDOMChange={this.onChange} />
        </FormField>
        <FormField label="Password">
          <PasswordInput
            id={fields.password}
            name="password"
            value={password}
            onChange={this.onChange} />
        </FormField>
        <FormField label="Repeat Password">
          <PasswordInput
            id={fields.password_confirmation}
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={this.onChange} />
        </FormField>
        {this.renderErrors()}
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
