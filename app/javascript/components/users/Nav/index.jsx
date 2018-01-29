import React, { Component } from "react"
import { Button, Layer, Menu, Anchor } from "grommet"
import LoginIcon from "grommet/components/icons/base/Login"
import UserIcon from "grommet/components/icons/base/User"
import Auth from "../Auth"

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
      <Menu responsive label={`Hello ${user.username}`} icon={<UserIcon />}>
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
          <Auth {...this.props} />
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
