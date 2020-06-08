import gql from 'graphql-tag'
import { recordFragment } from '../fragments'

const CREATE_RECORD = gql`
  mutation createRecord($data: RecordCreateInput!) {
    createRecord(data: $data) {
      ...record
    }
  }

  ${recordFragment}
`

export default CREATE_RECORD
