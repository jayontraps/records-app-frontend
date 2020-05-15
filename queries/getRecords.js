
import gql from 'graphql-tag'
import {perPage} from '../config'

const GET_RECORDS = gql`
  query getRecords($where: RecordWhereInput, $orderBy: RecordOrderByInput, $skip: Int = 0, $first: Int = ${perPage}) {
    records(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      id
      status
      author {
        name
        id
      }
      legacyObserver
      species {        
        id
        name
        rarity
        classification {
          name
          id
        }
      }
      location {
        id
        site
        gridRef
      }
      date
      dateTo
      startTime
      endTime
      count
      notes
      breeding_code {
        id
        description
        code
      }
      images {
        id
        src
        public_id
        original_filename
      }
      latlng {
        id
        lat 
        lng
      }
      createdAt    
    }
  }
`

export default GET_RECORDS
