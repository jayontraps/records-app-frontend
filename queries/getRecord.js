import gql from 'graphql-tag'
import { recordFragment } from '../fragments'

const GET_RECORD = gql`
  query getRecord($where: RecordWhereUniqueInput!) {
    record(where: $where) {
      ...record
    }    
  }

  ${recordFragment}
`

export default GET_RECORD
