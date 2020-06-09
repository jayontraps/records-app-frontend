import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import User from './User'
import SignOut from './SignOut'

const StyledHeader = styled.header`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto 2rem auto;
  padding: 1rem 0;
  a,
  .signout {
    font-size: 14px;
    margin-right: 15px;
    text-decoration: none;
    color: ${props => props.theme.colors.active};
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .is-active {
    text-decoration: underline;
  }
`

const Header = ({ router: { pathname } }) => (
  <StyledHeader>
    <User>
      {({ data }) => {
        const me = data ? data.me : null
        return (
          <>
            {me && (
              <>
                <Link href="/">
                  <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
                </Link>
                <Link href="/create">
                  <a className={pathname === '/create' ? 'is-active' : ''}>
                    Create Record
                  </a>
                </Link>
                <Link href="/account">
                  <a className={pathname === '/account' ? 'is-active' : ''}>
                    Account
                  </a>
                </Link>
                <Link href="/permissions">
                  <a className={pathname === '/permissions' ? 'is-active' : ''}>
                    Permissions
                  </a>
                </Link>
                <SignOut />
                {me.name}
              </>
            )}
            {!me && (
              <>
                <Link href="/">
                  <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
                </Link>
                <Link href="/signup">
                  <a className={pathname === '/signup' ? 'is-active' : ''}>
                    Log in
                  </a>
                </Link>
              </>
            )}
          </>
        )
      }}
    </User>
  </StyledHeader>
)

export default withRouter(Header)
