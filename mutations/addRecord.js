import gql from 'graphql-tag'

const ADD_RECORD = gql`
  mutation addRecord($data: RecordCreateInput!) {
    createRecord(data: $data) {
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

export default ADD_RECORD