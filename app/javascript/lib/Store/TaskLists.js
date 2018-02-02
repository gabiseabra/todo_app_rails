import _ from "lodash/fp"
import { observable } from "mobx"
import { asyncAction } from "./BaseStore"
import ResourceStore from "./PaginatedResourceStore"

const collect = key => _.flow(
  _.map(props => props[key]),
  _.compact,
  _.uniqBy("id")
)

const collectUsers = collect("user")

export default class TaskLists extends ResourceStore {
  pagination = observable.object({})

  get endpoint() { return this.api.taskLists }

  get(id) {
    const { users, tasks } = this.store
    const data = super.get(id)
    if(!data) return undefined
    const relations = {}
    relations.user = users.get(data.user_id)
    relations.tasks = tasks.getScope(data.id)
    return { ...data, ...relations }
  }

  getFeed(page) {
    const feed = this.scopes.get("@@feed")
    if(feed && feed.pages[page]) return this.getAll(feed.pages[page])
    else return undefined
  }

  hydrateCollection({ data, ...args }) {
    const { users, tasks } = this.store
    users.hydrateCollection({ data: collectUsers(data) })
    data.forEach(({ id, tasks: children }) => {
      if(children) {
        tasks.hydrateCollection({
          scope: tasks.getScope(id),
          data: children
        })
      }
    })
    super.hydrateCollection({ data, ...args })
  }

  hydrate({ data, id, ...args }) {
    const { users, tasks } = this.store
    if(data.user) users.hydrate({ id: data.user_id, data: data.user })
    if(data.tasks) {
      tasks.hydrateCollection({
        scope: tasks.endpoint.scope(id),
        data: data.tasks
      })
    }
    super.hydrate({ data, id, ...args })
  }

  @asyncAction async fetchFeed() {
    const response = await this.api.json("")
    this.hydrateCollection({ ...response, scope: "@@feed" })
  }
}
