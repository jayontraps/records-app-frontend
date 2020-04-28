import Raect from 'react'
import { useQuery } from '@apollo/react-hooks'
import ErrorMessage from './ErrorMessage'
import { GET_RECORDS }from '../queries'
import Record from './Record'
import styled from 'styled-components'
import Pagination from './Pagination'
import { perPage } from '../config'

const StyledRecordList = styled.div``




const RecordsList = props => {
  const page = props.queryParams.page

  const recordsQueryVars = {
    orderBy: `date_DESC`,
    skip: page * perPage - perPage,
    first: perPage
  }

  const { loading, error, data } = useQuery(
    GET_RECORDS,
    {
      variables: recordsQueryVars,
    }
  )

  if (error) return <ErrorMessage message="Error loading records." />
  if (loading) return <div>Loading</div>

  const { records } = data
  
  return (
    <StyledRecordList>            
      {records.map((rec, index) => (
        <Record 
          record={rec}
          key={`${rec.id}-${index}`} 
        />
      ))}      
      <Pagination page={parseFloat(props.queryParams.page) || 1} />            
    </StyledRecordList>
  )
}

export default RecordsList