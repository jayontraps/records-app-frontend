import gql from 'graphql-tag'

const DELETE_IMAGE = gql`
  mutation deleteImageFromRecord($public_id: String!) {
    deleteImageFromRecord(public_id: $public_id) 
  }
`

export default DELETE_IMAGE