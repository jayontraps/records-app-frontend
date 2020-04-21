import { useQuery } from '@apollo/react-hooks'
import ErrorMessage from './ErrorMessage'
import { GET_RECORDS }from '../queries'
import Record from './Record'

export const recordsQueryVars = {
  orderBy: `date_DESC`,
  skip: 0,
  first: 10,
}

export default function RecordsList() {
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
    <section>            
      {records.map((rec, index) => (
        <Record 
          record={rec}
          key={`${rec.id}-${index}`} 
        />
      ))}                  
    </section>
  )
}
