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
        name
      }
      location {
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
        description
        code
      }
      images {
        src
      }
      latlng {
        lat 
        lng
      }
      createdAt      
    }
  }
`

export default ADD_RECORD