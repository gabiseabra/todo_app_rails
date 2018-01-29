import React from "react"
import { FormField } from "grommet"

export default function SignUpField({ children, errors, id, ...props }) {
  const child = React.Children.only(children)
  return (
    <div>
      <FormField {...props}>
        {React.cloneElement(child, { id })}
      </FormField>
      {errors &&
      <div className="error">
        {errors}
      </div>}
    </div>
  )
}
