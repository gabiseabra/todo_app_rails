import React from "react"
import { Section, Title } from "grommet"

export default function Page({ title, children }) {
  return (
    <Section>
      {title && <Title>{title}</Title>}
      {children}
    </Section>
  )
}
