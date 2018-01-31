import React from "react"
import { PasswordInput } from "grommet"
import { Form } from "../../../shared"

const FIELDS = {
  email: {
    label: "Email",
    id: "todo_field_email"
  },
  username: {
    label: "Username",
    id: "todo_field_username"
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

export default function SignUp({ onSubmit }) {
  return (
    <Form pad="medium" onSubmit={onSubmit}>{FIELDS}</Form>
  )
}
