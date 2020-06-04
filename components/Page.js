import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Meta from './Meta'

const StyledPage = styled.div``

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 1rem;
`

class Page extends Component {
  render() {
    return (
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{this.props.children}</Inner>
      </StyledPage>
    )
  }
}

export default Page
