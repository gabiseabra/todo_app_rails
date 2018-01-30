import ResourceStore from "./ResourceStore"

export default class TaskLists extends ResourceStore {
  get endpoint() { return this.api.taskLists }
}
