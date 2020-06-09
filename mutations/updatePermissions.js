import gql from 'graphql-tag'

const UPDATE_PERMISSIONS = gql`
  mutation UPDATE_PERMISSIONS($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`

export default UPDATE_PERMISSIONS
