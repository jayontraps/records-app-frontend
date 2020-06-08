import App from '../components/App'
import { withApollo } from '../lib/apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { readString } from 'react-papaparse'
import moment from 'moment'

const StyledPage = styled.div`
  margin: 30px 0;
`

function formatDateString(str) {
  let date = str.split('/').reverse().join('-')
  return moment(date).format()
}

const test = '13/01/1976'

console.log(formatDateString(test))

// LOCATIONS
const CREATE_RECORD = gql`
  mutation createRecordFromCSV($data: RecordFromCSVInput!) {
    createRecordFromCSV(data: $data) {
      id
    }
  }
`

const recordsData = `Sand Martin,LF,28/06/2018,,0,Time: 09:30,,R C Watts
Siskin,SF,29/10/2018,,0,Time: 07:50,,R C Watts`

// data: {
//   species: data[0]
//   location: data[1]
//   dateFrom: data[2]
//   dateTo: data[3]
//   count: data[4]
//   notes: data[5]
//   breedingCode: data[6]
//   observer: data[7]
// }

const results = readString(recordsData)
console.log(results.data)

function Add() {
  let input
  const [createRecord, { data }] = useMutation(CREATE_RECORD)

  const waitFor = ms => new Promise(r => setTimeout(r, ms))

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          const start = async () => {
            await asyncForEach(results.data, async data => {
              await waitFor(1000)

              createRecord({
                variables: {
                  data: {
                    species: data[0],
                    location: data[1],
                    dateFrom: formatDateString(data[2]),
                    dateTo: data[3] ? formatDateString(data[3]) : '',
                    count: data[4],
                    notes: data[5],
                    breedingCode: data[6],
                    observer: data[7]
                  }
                }
              })

              console.log('Complete: ', data)
            })
            console.log('Done')
          }

          start()
        }}
      >
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

const IndexPage = () => (
  <App>
    <StyledPage>
      <Add />
    </StyledPage>
  </App>
)

export default withApollo({ ssr: true })(IndexPage)
