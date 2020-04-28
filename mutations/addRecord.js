import gql from 'graphql-tag'

const ADD_RECORD = gql`
  mutation addRecord($data: RecordCreateInput!) {
    createRecord(data: $data) {
      author {
        name
      }
    }
  }
`

export default ADD_RECORD