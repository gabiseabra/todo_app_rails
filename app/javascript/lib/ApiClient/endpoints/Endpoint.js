export default class Endpoint {
  constructor(api) {
    this.api = api
    this.fetch = api.fetch
    this.json = api.json
  }
}
