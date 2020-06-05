import gql from 'graphql-tag'
import { userFragment } from '../fragments'

const GET_CURRENT_USER = gql`
  query {
    me {
      ...user
    }
  }

  ${userFragment}
`

export default GET_CURRENT_USER
