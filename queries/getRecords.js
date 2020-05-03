
import gql from 'graphql-tag'
import {perPage} from '../config'

const GET_RECORDS = gql`
  query getRecords(
    $where: RecordWhereInput, 
    $orderBy: RecordOrderByInput!, 
    $skip: Int = 0, 
    $first: Int = ${perPage}){
    records(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      id
      status
      author {
        name
        id
      }
      legacyObserver
      species {
        name
      }
      location {
        site
      }
      date
      dateTo
      startTime
      endTime
      count
      notes
      breeding_code {
        description
        code
      }
      createdAt    
    }
  }
`

export default GET_RECORDS
