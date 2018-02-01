import React from "react"
import { inject, observer } from "mobx-react"
import { Form } from "@/components/task_lists"
import { Form as TasksForm } from "../tasks"
import { Loader } from "../shared"

function EditTaskListsApp({ id, taskLists, ...props }) {
  const data = taskLists.get(id)
  return (
    <Loader
      load={() => taskLists.fetch(id)}
      loading={taskLists.loading}
      error={taskLists.error}
      valid={typeof data !== "undefined"}>
      <Form
        onUpdate={taskLists.update}
        onDelete={taskLists.delete}
        {...data}
        {...props} />
      <TasksForm id={id} />
    </Loader>
  )
}

export default inject("taskLists")(observer(EditTaskListsApp))
