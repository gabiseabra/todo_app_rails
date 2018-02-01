import _ from "lodash/fp"
import { observable } from "mobx"
import { asyncAction } from "./BaseStore"
import ResourceStore from "./ResourceStore"

const byId = _.keyBy("id")

const collect = key => _.flow(
  _.map(props => props[key]),
  _.compact,
  byId
)

const collectUsers = collect("user")
const collectTasks = collect("tasks")

export default class TaskLists extends ResourceStore {
  pagination = observable.object({})

  get endpoint() { return this.api.taskLists }

  get(id) {
    const data = super.get(id)
    data.user = this.store.users.get(data.user_id)
    data.tasks = this.store.users.getScope(data.id)
    return data
  }

  getFeed() { return this.getScope("@feed") }

  hydrate(collection) {
    const { users, tasks } = this.store
    console.log(users, tasks)
    super.hydrate(collection)
    users.hydrate(collectUsers(collection))
    tasks.hydrate(collectTasks(collection))
  }

  @asyncAction async fetchFeed() {
    const { data, pagination } = await this.api.json("")
    this.hydrate(byId(data), "@feed")
    Object.assign(this.pagination, pagination)
  }
}
