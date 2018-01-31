import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button, Menu, Anchor } from "grommet"
import LoginIcon from "grommet/components/icons/base/Login"
import { Layer } from "../shared"
import Form from "./Form"
import Avatar from "./Avatar"

export default class UserNav extends Component {
  state = {
    active: false
  }

  componentWillReceiveProps({ user }) {
    if(user && this.state.active) {
      this.onToggle(false)
    }
  }

  onToggle = () => this.setState(state => ({
    active: !state.active
  }))

  renderGreeting() {
    const { user, onSignOut } = this.props

    return (
      <Menu responsive label={`Hello ${user.username}`} icon={<Avatar src={user.avatar_url} size="small" />}>
        <Link to="/me">
          <Anchor tag="span">
            Dashboard
          </Anchor>
        </Link>
        <Anchor onClick={onSignOut}>
          Logout
        </Anchor>
      </Menu>
    )
  }

  renderLogin() {
    const { active } = this.state

    return (
      <div>
        <Button label="Login" icon={<LoginIcon />} onClick={this.onToggle} />
        {active &&
        <Layer
          closer
          overlayClose
          align="center"
          onClose={this.onToggle}>
          <Form {...this.props} />
        </Layer>}
      </div>
    )
  }
  render() {
    const { user } = this.props

    return (
      <div>
        {user ? this.renderGreeting() : this.renderLogin()}
      </div>
    )
  }
}
