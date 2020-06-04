import App from 'next/app'
import React from 'react'
import Page from '../components/Page'
import { ThemeProvider } from 'styled-components'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const theme = {
  fonts: {
    fontFamily: ` Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
  'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New',
  monospace, serif`,
    sizes: {
      body: '13px'
    },
    bodyLineHeight: '1.5em'
  },
  colors: {
    focused: '#2684FF',
    active: '#22bad9',
    activeHover: '#12758C',
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
  borderRadius: '4px',
  icon: {
    width: '1rem',
    height: '1rem',
    fill: '#616161'
  },
  maxWidth: '1200px'
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    )
  }
}
