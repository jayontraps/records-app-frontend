import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import User from './User'

const StyledHeader = styled.header`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 1rem;

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
    <Link href="/create">
      <a className={pathname === '/create' ? 'is-active' : ''}>Create Record</a>
    </Link>
    <Link href="/signup">
      <a className={pathname === '/signup' ? 'is-active' : ''}>Log in</a>
    </Link>
    <User>
      {data => {
        return <p>User</p>
      }}
    </User>
  </StyledHeader>
)

export default withRouter(Header)
