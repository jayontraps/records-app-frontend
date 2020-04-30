import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const theme = {
  fonts: {
    fontFamily: ` Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
  'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New',
  monospace, serif`,
    sizes: {
      body: '13px'
    }
  },
  colors: {
    primary: '#616161',
    borderColor: '#d8d8d8',
    description: '#bbbbbb',
    legacy: '#999'
  },
  list: {
    spacing: {
      vertical: '.75rem'
    }
  },
  borderRadius: '4px'  
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
