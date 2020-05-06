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

export default DELETE_RECORD