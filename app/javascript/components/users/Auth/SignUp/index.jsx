import autobind from "autobind-decorator"
import React, { Component } from "react"
import { Button, Form, TextInput, PasswordInput } from "grommet"
import Spinner from "grommet/components/icons/Spinning"
import FormField from "./Field"

export default class SignUp extends Component {
  static defaultProps = {
    fields: {
      email: {
        label: "Email",
        id: "todo_field_email",
        Input: TextInput
      },
      username: {
        label: "Username",
        id: "todo_field_username",
        Input: TextInput
      },
      password: {
        label: "Password",
        id: "todo_field_password",
        Input: PasswordInput
      },
      password_confirmation: {
        label: "Password Confirmation",
        id: "todo_field_password_confirmation",
        Input: PasswordInput
      }
    }
  }

  state = {
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  @autobind
  renderField(name) {
    const { Input, ...props } = this.props.fields[name]
    let { errors } = this.props
    if(errors) errors = errors[name]
    return (
      <FormField key={name} errors={errors} {...props}>
        <Input
          name={name}
          value={this.state[name]}
          onDOMChange={this.onChange} />
      </FormField>
    )
  }

  render() {
    const { loading, fields } = this.props

    return (
      <Form onSubmit={this.onSubmit}>
        {Object.keys(fields).map(this.renderField)}
        <div style={{ margin: "20px 0", textAlign: "right" }}>
          <Button
            primary
            type={loading ? null : "submit"}
            icon={loading ? <Spinner /> : null}
            label="Submit" />
        </div>
      </Form>
    )
  }
}
