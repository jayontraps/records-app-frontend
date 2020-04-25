import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const theme = {
  colors: {
    primary: '#777',
    borderColor: '#dbdbdb',
    description: '#bbbbbb'
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
