import gql from 'graphql-tag'
import { recordFragment } from '../fragments'

const DELETE_IMAGE = gql`
  mutation deleteImageFromRecord($public_id: String!) {
    deleteImageFromRecord(public_id: $public_id) {
      ...record
    }
  }

  ${recordFragment}
`

export default DELETE_IMAGE