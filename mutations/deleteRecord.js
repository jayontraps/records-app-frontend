import gql from 'graphql-tag'
import { recordFragment } from '../fragments'

const DELETE_RECORD = gql`
  mutation deleteRecord($where: RecordWhereUniqueInput!) {
    deleteRecord(where: $where) {
      ...record    
    }
  }

  ${recordFragment}
`

export default DELETE_RECORD