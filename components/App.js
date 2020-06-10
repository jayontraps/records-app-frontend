import GlobalStyle from './GlobalStyle'
import React, { Fragment } from 'react'
import User from '../components/User'
import UserContext from '../UserContext'

export default ({ children }) => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null
      return (
        <UserContext.Provider value={{ me }}>
          <GlobalStyle />
          <main>{children}</main>
        </UserContext.Provider>
      )
    }}
  </User>
)
