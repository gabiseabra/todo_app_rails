import React from "react"
import { Form } from "../../shared"

export default function TaskListForm(props) {
  return (
    <Form {...props}>
      {{
        title: {
          label: "Title"
        }
      }}
    </Form>
  )
}
