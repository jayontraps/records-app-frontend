import gql from 'graphql-tag'

const DELETE_IMAGE = gql`
  mutation deleteImageFromCloudinary($public_id: String!) {
    deleteImageFromCloudinary(public_id: $public_id) {
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

export default DELETE_IMAGE