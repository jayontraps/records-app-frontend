import gql from 'graphql-tag'

const GET_USERS = gql`
  query getUsers($where: UserWhereInput) {
  users(where:$where) {
    name
    id
  }
}

`

export default GET_USERS
