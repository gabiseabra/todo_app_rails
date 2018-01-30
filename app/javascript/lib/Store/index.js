import Users from "./Users"
import TaskLists from "./TaskLists"
import Tasks from "./Tasks"

export default class AppStore {
  constructor(options) {
    this.users = new Users(this, options)
    this.taskLists = new TaskLists(this, options)
    this.tasks = new Tasks(this, options)
  }
}
