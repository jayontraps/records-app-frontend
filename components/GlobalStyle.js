import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  ol, ul {
    list-style: none;
  }

  a img {
    border: none;
  }

  article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
    display: block;
  }

  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  /* prevent IOS scaling up on active form inputs if global font-size is smaller than 16px */
  @media screen and (max-width: 756px) {
    button,
    input,
    optgroup,
    select,
    textarea {
      font-size: 16px;
    }
  }
  * { 
    font-family: ${props => props.theme.fontFamily};
  }
  body {
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fontFamily};
    margin: 0;
    padding: 25px 50px;
  }
  a {
    color: #22bad9;
  }
  p {
    font-size: 14px;
    line-height: 24px;
  }
  article {
    margin: 0 auto;
    max-width: 650px;
  }
  button {
    align-items: center;
    background-color: #22bad9;
    border: 0;
    color: white;
    display: flex;
    padding: 5px 7px;
    transition: background-color 0.3s;
  }
  button:active {
    background-color: #1b9db7;
  }
  button:disabled {
    background-color: #b5bebf;
  }
  button:focus {
    outline: none;
  }
`

export default GlobalStyle