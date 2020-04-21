import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#777',
  },
  fontFamily: ` Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
  'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New',
  monospace, serif`
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
