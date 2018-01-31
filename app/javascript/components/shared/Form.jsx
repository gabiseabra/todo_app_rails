import _ from "lodash"
import autobind from "autobind-decorator"
import React, { Component } from "react"
import { Button, Form, FormField, TextInput } from "grommet"

const NormalizedTextInput = ({ onChange, ...props }) => (
  <TextInput onDOMChange={onChange} {...props} />
)

export default class SignUp extends Component {
  static defaultProps = {
    children: {}
  }

  constructor(props) {
    super(props)
    this.state = _.mapValues(props.children, ({ initialValue }) => initialValue || "")
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value })

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  @autobind
  renderField(name) {
    // eslint-disable-next-line prefer-const
    let { Input, ...props } = this.props.children[name]
    let { errors } = this.props
    if(errors) errors = errors[name]
    if(!Input) Input = NormalizedTextInput
    return (
      <FormField key={name} error={errors} {...props}>
        <Input
          name={name}
          value={this.state[name]}
          onChange={this.onChange} />
      </FormField>
    )
  }

  render() {
    const { loading, children, ...props } = this.props

    return (
      <Form {...props} onSubmit={this.onSubmit}>
        {Object.keys(children).map(this.renderField)}
        <div style={{ margin: "20px 0", textAlign: "right" }}>
          <Button
            primary
            type={loading ? null : "submit"}
            label="Submit" />
        </div>
      </Form>
    )
  }
}
