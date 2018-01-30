import autobind from "autobind-decorator"
import React, { Component } from "react"
import { Button, Form, FormField, TextInput, PasswordInput } from "grommet"
import Spinner from "grommet/components/icons/Spinning"

const NormalizedTextInput = ({ onChange, ...props }) => (
  <TextInput onDOMChange={onChange} {...props} />
)

export default class SignUp extends Component {
  static defaultProps = {
    fields: {
      email: {
        label: "Email",
        id: "todo_field_email",
        Input: NormalizedTextInput
      },
      username: {
        label: "Username",
        id: "todo_field_username",
        Input: NormalizedTextInput
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
      <FormField key={name} error={errors} {...props}>
        <Input
          name={name}
          value={this.state[name]}
          onChange={this.onChange} />
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
