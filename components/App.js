import GlobalStyle from './GlobalStyle'
import React, { Fragment } from 'react'

export default ({ children }) => (
  <Fragment>
    <GlobalStyle />
    <main>
      {children}  
    </main>
  </Fragment>
)
