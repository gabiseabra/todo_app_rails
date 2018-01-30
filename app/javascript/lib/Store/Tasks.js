import ResourceStore from "./ResourceStore"

export default class Tasks extends ResourceStore {
  get endpoint() { return this.api.tasks }
}
