import gql from 'graphql-tag'
import { userFragment } from '../fragments'

const SIGN_UP = gql`
  mutation SIGN_UP($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      ...user
    }
  }

  ${userFragment}
`

export default SIGN_UP
