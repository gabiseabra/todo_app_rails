import React from "react"
import { Layer, Title } from "grommet"

export default function AppLayer({ children, title, ...props }) {
  return (
    <Layer
      flush
      closer
      overlayClose
      align="center"
      className="Shared-Layer"
      {...props}>
      {title && <Title className="Shared-Layer--title">{title}</Title>}
      {children}
    </Layer>
  )
}
