import _ from "lodash/fp"
import qs from "querystring"
import { observable } from "mobx"
import { asyncAction } from "./BaseStore"
import ResourceStore from "./PaginatedResourceStore"

const cleanQuery = _.omitBy(_.isEmpty)

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

  getFeedData() { return this.scopes.get("@@feed") || { pages: {}, pagination: {} } }

  getFeed(page) {
    const feed = this.getFeedData()
    if(feed.pages[page]) return this.getAll(feed.pages[page])
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

  @asyncAction async fetchFeed(query) {
    const queryString = query ? qs.stringify(cleanQuery(query)) : ""
    const response = await this.api.json(`?${queryString}`)
    this.hydrateCollection({ ...response, scope: "@@feed", query })
  }
}
