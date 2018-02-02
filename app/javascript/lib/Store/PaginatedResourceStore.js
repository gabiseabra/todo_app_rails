import _ from "lodash"
import ResourceStore from "./ResourceStore"

export default class PaginatedResourceStore extends ResourceStore {

  getScopePage(...args) {
    const [ page ] = args.splice(-1, 1)
    const scope = this.getScopeData(...args)
    if(scope) return scope.pages[page]
    else return undefined
  }

  getPagination(...args) {
    const scope = this.getScopeData(...args)
    if(scope) return scope.pagination
    else return undefined
  }

  getScope(...args) { return this.getAll(this.getScopePage(...args)) }

  hydrateCollection({ data, pagination, scope, page, ...args }) {
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
