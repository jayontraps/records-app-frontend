import gql from 'graphql-tag'
import { userFragment } from '../fragments'

const GET_USERS_ADMIN = gql`
  query getUsersAdmin {
    usersAdmin {
      ...user
    }
  }

  ${userFragment}
`

export default GET_USERS_ADMIN
