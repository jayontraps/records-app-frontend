import gql from 'graphql-tag'
import { recordFragment } from '../fragments'

const ADD_RECORD = gql`
  mutation addRecord($data: RecordCreateInput!) {
    createRecord(data: $data) {
      ...record      
    }
  }

  ${recordFragment}
`

export default ADD_RECORD