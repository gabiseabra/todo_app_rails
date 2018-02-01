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

export default class TaskLists extends ResourceStore {
  pagination = observable.object({})

  get endpoint() { return this.api.taskLists }

  get(id) {
    const data = super.get(id)
    data.user = this.store.users.get(data.user_id)
    data.tasks = this.store.tasks.getScope(data.id)
    return data
  }

  getFeed() { return this.getAll(this.scopes.get("@@feed")) }

  hydrate(collection, ...args) {
    const { users, tasks } = this.store
    super.hydrate(collection, ...args)
    users.hydrate(collectUsers(collection))
    collection.forEach((data) => {
      if(data.tasks) {
        const scope = tasks.getScope(data.id)
        tasks.hydrate(scope, byId(data.tasks))
      }
    })
  }

  @asyncAction async fetchFeed() {
    const response = await this.api.json("")
    this.hydrateCollection({ ...response, scope: "@@feed" })
  }
}
