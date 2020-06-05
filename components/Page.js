import React, { Component } from 'react'
import styled from 'styled-components'
import Meta from './Meta'

const StyledPage = styled.div``

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 1rem;

  .nav,
  .records-list {
    margin-bottom: 20px;
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;
    button {
      background-color: ${props => props.theme.colors.active};
      border-color: ${props => props.theme.colors.active};
      color: white;
      &:hover {
        background-color: ${props => props.theme.colors.activeHover};
        border-color: ${props => props.theme.colors.activeHover};
      }
    }
  }
`

class Page extends Component {
  render() {
    return (
      <StyledPage>
        <Meta />
        <Inner>{this.props.children}</Inner>
      </StyledPage>
    )
  }
}

export default Page
