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

export default DELETE_RECORD