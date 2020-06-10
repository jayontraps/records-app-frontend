import { useContext } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import SignOut from './SignOut'
import Permission from './Permission'
import UserContext from '../UserContext'

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

const Header = ({ router: { pathname } }) => {
  const userInfo = useContext(UserContext)
  const { me } = userInfo
  return (
    <StyledHeader>
      {me && (
        <>
          <Link href="/">
            <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
          </Link>
          <Link href="/account">
            <a className={pathname === '/account' ? 'is-active' : ''}>
              Account
            </a>
          </Link>
          <Permission permissions={['ADMIN']} user={me}>
            <Link href="/permissions">
              <a className={pathname === '/permissions' ? 'is-active' : ''}>
                Permissions
              </a>
            </Link>
          </Permission>
          <SignOut />
          user: {me.name}
        </>
      )}

      {!me && (
        <>
          <Link href="/">
            <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
          </Link>
          <Link href="/signup">
            <a className={pathname === '/signup' ? 'is-active' : ''}>Sign in</a>
          </Link>
        </>
      )}
    </StyledHeader>
  )
}

export default withRouter(Header)
