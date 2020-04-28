import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from "styled-components"

const StyledHeader = styled.header`
  header {
    margin-bottom: 25px;
  }
  a {
    font-size: 14px;
    margin-right: 15px;
    text-decoration: none;
  }
  .is-active {
    text-decoration: underline;
  }
`

const Header = ({ router: { pathname } }) => (
  <StyledHeader>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
    <Link href="/client-only">
      <a className={pathname === '/client-only' ? 'is-active' : ''}>
        Client-Only
      </a>
    </Link>
    <Link href="/about">
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>    
    <Link href="/create">
      <a className={pathname === '/create' ? 'is-active' : ''}>Create</a>
    </Link>
    <Link href="/setup">
      <a className={pathname === '/setup' ? 'is-active' : ''}>setup</a>
    </Link>
    <Link href="/records">
      <a className={pathname === '/records' ? 'is-active' : ''}>records</a>
    </Link>
  </StyledHeader>
)

export default withRouter(Header)
