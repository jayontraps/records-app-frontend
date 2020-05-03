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

export default ADD_RECORD