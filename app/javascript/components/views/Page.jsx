import React from "react"
import { withRouter } from "react-router-dom"
import PrevIcon from "grommet/components/icons/base/LinkPrevious"
import { Article, Header, Heading, Button } from "grommet"

function Page({ title, returnTo, children, history }) {
  return (
    <Article>
      <Header className="App-Page--header">
        {returnTo &&
        <Button
          icon={<PrevIcon />}
          onClick={() => history.push(returnTo)} />}
        {title && <Heading tag="h2">{title}</Heading>}
      </Header>
      {children}
    </Article>
  )
}

export default withRouter(Page)
