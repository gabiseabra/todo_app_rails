import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { Loader } from "@/components/shared"
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
      <Loader loading={taskLists.loading}>
        <Form
          new
          onCreate={this.onSubmit}
          {...props} />
        <TasksForm disabled />
      </Loader>
    )
  }
}

export default withRouter(inject("taskLists")(observer(NewTaskListsApp)))
