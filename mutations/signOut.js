import gql from 'graphql-tag'

const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signout {
      message
    }
  }
`

export default SIGN_OUT
