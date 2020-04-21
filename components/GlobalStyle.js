import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
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