import gql from 'graphql-tag'
import { recordFragment } from '../fragments'

const UPDATE_RECORD = gql`
  mutation updateRecord($data: RecordUpdateInput!, $where: RecordWhereUniqueInput!) {
    updateRecord(data: $data, where: $where) {
      ...record     
    }
  }
  ${recordFragment}
`

export default UPDATE_RECORD