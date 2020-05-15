import gql from 'graphql-tag'

const DELETE_RECORD = gql`
  mutation deleteRecord($where: RecordWhereUniqueInput!) {
    deleteRecord(where: $where) {
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

export default DELETE_RECORD