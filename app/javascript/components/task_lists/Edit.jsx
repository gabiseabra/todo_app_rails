import React from "react"
import { Form } from "../shared"

export default function EditTaskList(props) {
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
