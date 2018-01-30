import React from "react"
import { Article, Heading } from "grommet"

export default function Page({ title, children }) {
  return (
    <Article>
      {title && <Heading>{title}</Heading>}
      {children}
    </Article>
  )
}
