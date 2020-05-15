import gql from 'graphql-tag'

const UPDATE_RECORD = gql`
  mutation updateRecord($data: RecordUpdateInput!, $where: RecordWhereUniqueInput!) {
    updateRecord(data: $data, where: $where) {
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

export default UPDATE_RECORD