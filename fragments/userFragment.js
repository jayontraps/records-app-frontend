import gql from 'graphql-tag'

const userFragment = gql`
  fragment user on User {
    id
    name
    email
    password
    permissions
  }
`

export default userFragment
