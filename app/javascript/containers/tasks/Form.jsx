import React from "react"
import { inject, observer } from "mobx-react"
import { Form } from "@/components/tasks"
import { Loader } from "../shared"

function EditTasksApp({ id, tasks, ...props }) {
  const data = tasks.getScope(id)
  return (
    <Loader
      load={() => tasks.fetchScope(id, {})}
      loading={tasks.loading}
      error={tasks.error}
      valid={typeof data !== "undefined"}>
      <Form
        onCreate={(...args) => tasks.create(id, ...args)}
        onUpdate={tasks.update}
        onDelete={tasks.delete}
        {...props}>
        {data}
      </Form>
    </Loader>
  )
}

export default inject("tasks")(observer(EditTasksApp))
