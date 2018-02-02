const csrfTokenEl = document.querySelector("meta[name=csrf-token]")

export const csrfToken = csrfTokenEl ? csrfTokenEl.getAttribute("content") : undefined

export const authToken = JSON.parse(document.getElementById("authentication-token").textContent)

export const currentUser = JSON.parse(document.getElementById("authenticated-user").textContent)
