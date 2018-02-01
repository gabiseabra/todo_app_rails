import React from "react"
import { inject, observer } from "mobx-react"
import { Form } from "@/components/task_lists"
import { Form as TasksForm } from "@/components/tasks"

function NewTaskListsApp({ taskLists, ...props }) {
  return (
    <div>
      <Form
        new
        onCreate={taskLists.create}
        {...props} />
      <TasksForm disabled />
    </div>
  )
}

export default inject("taskLists")(observer(NewTaskListsApp))
