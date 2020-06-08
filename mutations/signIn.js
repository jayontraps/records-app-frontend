import gql from 'graphql-tag'
import { userFragment } from '../fragments'

const SIGN_IN = gql`
  mutation SIGN_IN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      ...user
    }
  }

  ${userFragment}
`

export default SIGN_IN
