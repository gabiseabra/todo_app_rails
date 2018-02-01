import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { Form } from "@/components/task_lists"
import { Form as TasksForm } from "@/components/tasks"

class NewTaskListsApp extends Component {
  onSubmit = async (options) => {
    const { taskLists, userId, history } = this.props
    const id = await taskLists.create(userId, options)
    if(id) history.push(`/my/lists/${id}`)
  }

  render() {
    const { taskLists, ...props } = this.props
    return (
      <div>
        <Form
          new
          onCreate={this.onSubmit}
          {...props} />
        <TasksForm disabled />
      </div>
    )
  }
}

export default withRouter(inject("taskLists")(observer(NewTaskListsApp)))
