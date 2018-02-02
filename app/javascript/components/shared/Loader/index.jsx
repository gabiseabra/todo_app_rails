import React from "react"
import Content from "./Content"
import Indicator from "./Indicator"

export default function Loader({ children, ...props }) {
  let className = "Shared-Loader"
  if(props.loading) className += " Shared-Loader__loading"
  if(props.overlay) className += " Shared-Loader__overlay"
  else className += " Shared-Loader__no-overlay"
  return (
    <div className={className}>
      {props.loading && <Indicator {...props} />}
      <Content {...props}>{children}</Content>
    </div>
  )
}
