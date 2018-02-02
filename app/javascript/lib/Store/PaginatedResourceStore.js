import _ from "lodash"
import ResourceStore from "./ResourceStore"

export default class PaginatedResourceStore extends ResourceStore {
  getScopeData(...args) {
    return super.getScopeData(...args) || { pages: {}, pagination: {} }
  }

  getScopePage(...args) {
    const [ page ] = args.splice(-1, 1)
    const scope = this.getScopeData(...args)
    return scope.pages[page]
  }

  getScope(...args) { return this.getAll(this.getScopePage(...args)) }

  hydrateCollection({ data, pagination, scope, query, ...args }) {
    const page = query.page || 1
    super.hydrateCollection({ data, ...args })
    if(scope && pagination) {
      const info = this.scopes.get(scope)
      const newInfo = { pages: {}, pagination }
      if(info) Object.assign(newInfo.pages, info.pages)
      newInfo.pages[page] = _.map(data, "id")
      this.scopes.set(scope, newInfo)
    }
  }

  hydrate({ scope, ...args }) {
    super.hydrate(args)
    if(scope) {
      this.scopes.delete(scope)
    }
  }
}
