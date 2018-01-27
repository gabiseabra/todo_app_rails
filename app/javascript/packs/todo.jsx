import React from "react"
import ReactDOM from "react-dom"
import Shell from "@/components/views/Shell"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Shell />,
    document.body.appendChild(document.createElement('div')),
  )
})
