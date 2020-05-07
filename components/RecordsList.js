import Raect, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import ErrorMessage from './ErrorMessage'
import { GET_RECORDS, getRecordsVariables } from '../queries'
import Record from './Record'
import styled from 'styled-components'
import StyledRecord from './styles/StyledRecord'
import {perPage} from '../config'

const backgroundColor = 'whitesmoke'
const animationColor = 'white'

const StyledRecordList = styled.div`  
  .record:nth-of-type(odd) {
    background-color: whitesmoke;
  }
  .loading.record:nth-of-type(odd) {
    background: linear-gradient(270deg, ${backgroundColor}, ${backgroundColor}, ${animationColor}, ${backgroundColor}, ${backgroundColor}, ${backgroundColor});
    background-size: 1200% 1200%;
    animation: Loading 6s ease infinite;

    @keyframes Loading {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    } 
  }
`

const arr = [...Array(perPage)]

const LoadingList = () => (
  <StyledRecordList>
    {arr.map((item, index) => <StyledRecord key={`loading-${index}`} className="record loading" />)}
  </StyledRecordList>
)

const RecordsList = props => {
  const { queryParams } = props
  const variables = getRecordsVariables(queryParams)  
  
  const { loading, error, data } = useQuery(GET_RECORDS, {variables})

  if (error) return <ErrorMessage message="Error loading records." />
  if (loading) return <LoadingList />

  const { records } = data
  
  return (    
    <StyledRecordList className="records-list">  
      <StyledRecord>
        <div className="headings row first">
          <h4 className="date">Date</h4>
          <h4 className="species">Species</h4>
          <h4 className="location">Location</h4>
          <h4 className="count">Count</h4>
          <h4 className="observer">Observer</h4>
        </div>
      </StyledRecord>
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