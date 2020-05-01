import Raect from 'react'
import { useQuery } from '@apollo/react-hooks'
import ErrorMessage from './ErrorMessage'
import { GET_RECORDS, getRecordsVariables } from '../queries'
import Record from './Record'
import styled from 'styled-components'

const StyledRecordList = styled.div`
  .record:nth-of-type(odd) {
    background-color: whitesmoke;
  }
`

const RecordsList = props => {
  const { queryParams } = props
  const variables = getRecordsVariables(queryParams)  
  console.log('variables from the list: ', variables)

  const { loading, error, data } = useQuery(GET_RECORDS, {variables})

  if (error) return <ErrorMessage message="Error loading records." />
  if (loading) return <div>Loading</div>

  const { records } = data
  
  return (
    <StyledRecordList className="records-list">            
      {records.map((rec, index) => (
        <Record 
          record={rec}
          key={`${rec.id}-${index}`} 
        />
      ))}                       
    </StyledRecordList>
  )
}

export default RecordsList