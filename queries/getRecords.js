import gql from 'graphql-tag'
import {perPage} from '../config'
import { recordFragment } from '../fragments'

const GET_RECORDS = gql`
  query getRecords($where: RecordWhereInput, $orderBy: RecordOrderByInput, $skip: Int = 0, $first: Int = ${perPage}) {
    records(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      ...record  
    }
  }

  ${recordFragment}
`

export default GET_RECORDS
