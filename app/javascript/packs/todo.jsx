import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import { Provider } from "mobx-react"
import * as env from "@/env"
import ApiClient from "@/lib/ApiClient"
import Store from "@/lib/Store"
import App from "@/containers/views/App"

const API_URL = "/api"

function render(method = "render") {
  ReactDOM[method](
    <Provider {...render.store}>
      <HashRouter>
        <App className="Todo" />
      </HashRouter>
    </Provider>,
    render.root
  )
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body.appendChild(document.createElement("div"))
  const apiClient = new ApiClient(API_URL, env)
  const store = new Store({ apiClient, ...env })
  window.api = apiClient
  window.store = store
  Object.assign(render, { root, store, apiClient })()
})

if(module.hot) {
  module.hot.accept("../containers/views/App", () => {
    render("hydrate")
  })
  module.hot.accept("../lib/ApiClient", () => {
    render.apiClient = new ApiClient(API_URL, render.apiClient.options)
    render.store = new Store({ apiClient: render.apiClient, ...env })
    render("hydrate")
  })
  module.hot.accept("../lib/Store", () => {
    render.store = new Store({ apiClient: render.apiClient, ...env })
    render("hydrate")
  })
}
